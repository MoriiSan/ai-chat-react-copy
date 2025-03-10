import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Columns, Heading, Icon } from "react-bulma-components";
import { useNavigate, useLocation } from "react-router-dom";
import { chatMessage } from "./utils";

interface ChatBubbleParams {
  sender?: String;
  timeSent?: Date;
  message?: String;
  position?: "left" | "right";
  type?: 'text' | 'file';
  fileName?: string;
  title?: string;
  id?: string;
  userinput: string;
}

export const ChatBubble = (params: ChatBubbleParams) => {

  const navigate = useNavigate();
  const location = useLocation();

  return (

    <Box shadowless style={{
      padding: 0,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 20,
      marginLeft: params.sender === '_self' ? 20 : 0,
      marginRight: params.sender === '_self' ? 0 : 20,
      display: "flex",
      flexDirection: 'column',
      alignItems: params.sender === '_self' ? "end" : "start",
    }}
      onClick={() => {
        if (params.sender === 'AI Chat') {
          console.log("userinput", params.userinput);
          // Navigate('view-solution/' + params.id + '/' + params.userinput,{state:{...Location.state},});

          // Navigate to the 'view-solution' page when clicking on a message from AI Chat
          navigate('view-solution/' + params.id + '/' + params.userinput)
        }
      }}>
      <Box
        shadowless
        style={{
          margin: 0,
          padding: 0,
          fontSize: 12,
          fontWeight: "bold",
          textAlign: params.sender === '_self' ? "right" : "left",
        }}>

        {params.sender === '_self' ? 'Me' : params.sender}
      </Box>
      <Box
        style={{
          margin: 0,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#6ab1fc",
          display: 'flex',
          inlineSize: 'fit-content',
          flexDirection: 'column',
        }}>

        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0,
            background: "none",
            color: "white",
            fontSize: 14,
            overflowWrap: "anywhere",
          }}>

          {
            <>{params.title}</>
          }

        </Box>

        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0,
            background: "none",
            color: "white",
            fontSize: 14,
            overflowWrap: "anywhere",
          }}>

          {params.type && params.type == 'file' ?

            <>
              <Icon size="small">
                <FontAwesomeIcon icon={faPaperclip} size="1x" />
              </Icon>

              {params.fileName}
            </>
            :
            <>{params.message} </>
          }
        </Box>

        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            background: "none",
          }}>
          <span style={{
            marginLeft: "auto",
            color: "#dbdbdb",
            fontSize: 8,
          }}>

            {params.timeSent?.toLocaleTimeString()}

          </span>
        </Box>
      </Box>
    </Box>
  );
}