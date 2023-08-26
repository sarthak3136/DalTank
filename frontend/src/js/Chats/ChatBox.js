import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase1";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const useStyles = makeStyles((theme) => ({
  chatBox: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    width: 400,
    borderRadius: theme.spacing(1),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },
  chatBoxClosed: {
    background: "#2196f3",
    color: "#fff",
    "& $messagesWrapper": {
      display: "none",
    },
  },
  messagesWrapper: {
    width: "100%",
    height: 300,
    overflowY: "auto",
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    background: "white",
  },
}));

const ChatBox = ({ _id, email }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), limit(50));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the last message when messages change
    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleToggleChatbox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Box
      className={`${classes.chatBox} ${isOpen ? "" : classes.chatBoxClosed}`}
    >
      <IconButton onClick={handleToggleChatbox}>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      {isOpen && (
        <>
          <Box className={classes.messagesWrapper}>
            {messages?.map((message) => (
              <Message key={message.id} message={message} email={email} />
            ))}
            <span ref={scroll}></span>
          </Box>
          <SendMessage scroll={scroll} _id={_id} email={email} />
        </>
      )}
    </Box>
  );
};

export default ChatBox;
