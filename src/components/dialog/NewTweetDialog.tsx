import { Dialog } from "@mui/material";

import { NewTweetDialogProps } from "@/types/DialogProps";
import NewTweet from "../tweet/NewTweet";
import { useEffect, useState } from "react";

export default function NewTweetDialog({ open, handleNewTweetClose, token }: NewTweetDialogProps) {
    const [isSubmitted, setIsSubmited] = useState(false);

    const handleSubmit = () => {
        setIsSubmited(!isSubmitted);
    };

    useEffect(() => {
        handleNewTweetClose();
    }, [isSubmitted]);

    return (
        <Dialog className="dialog" open={open} onClose={handleNewTweetClose}>
            <div className="new-tweet-wrapper">
                <NewTweet token={token} handleSubmit={handleSubmit} />
            </div>
        </Dialog>
    );
}
