import PropTypes from "prop-types";
import {Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {sendMarketingMessage} from '@services/api';

const SendMessageButton  = (props) => {
    const {inputValues, isLoading, setIsLoading, inputError, setInputError, bodyInputValues, footerInputValues} = props;
    const sendMessage = async () => {
        const payload = {...inputValues, ...bodyInputValues, ...footerInputValues};
        // const payloadHeader = inputValues ? Object.fromEntries(
        //     Object.entries(inputValues).filter(([_, value]) => value !== "")
        // ) : {''};
        console.log(payload);
        
        if (!payload?.body) {
            setInputError(true);
            return;
        }

        if (!payload) return;
        setIsLoading(true);
        try {
            const response = await sendMarketingMessage(payload);

            return response;
        } catch (error) {
            console.error(
                "Erro ao enviar mensagem:",
                JSON.stringify(error.response?.data || error.message)
            );
        } finally {
            setIsLoading(false);

        }
    };

    return(
        <>
        <Button
          size="big"
          sx={{ m: 1, p: 1, width: "14rem", display: "flex" }}
          onClick={sendMessage}
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          disabled={inputError}
        >
          Enviar
        </Button>
    </>
    )
}

SendMessageButton.propTypes = {
    inputValues: PropTypes.object.isRequired,
    bodyInputValues: PropTypes.object.isRequired,
    footerInputValues: PropTypes.object.isRequired,
    setInputError: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    inputError: PropTypes.bool.isRequired,
};

export default SendMessageButton;