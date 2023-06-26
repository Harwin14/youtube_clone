import { AppBar, Box, CardMedia, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPi";
import { demoProfilePicture } from "../utils/constants";

const ChannelDetail = () => {
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`channels?part="snippet&id=${id}`).then((data) =>
            setChannelDetail(data?.items[0])
        );

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
            (data) => setVideos(data?.items)
        );
    }, [id]);
    return (
        <Box minHeight="95vh">
            <Box>
                <CardMedia
                    component="img"
                    src={
                        "  https://yt3.googleusercontent.com/DyQFbaS4xwZTB9Au3OFa4VcJebFO_o2nf0apiq8B4h6xRnC2FPkzIMkAREu2XUdjQC8oiR8S=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                    }
                    alt={channelDetail?.snippet?.title}
                    sx={{
                        height: "300px",
                        objectFit: "cover",
                    }}
                />
                <ChannelCard channelDetail={channelDetail} marginTop="-110px" />

                <AppBar
                    position="static"
                    style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        display:'flex',
                        justifyContent:'center',
                        borderBottom: "1px solid #vvv",
                        marginBottom:'20px'
                    }}
                >
                    <Toolbar    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        gap:20
                    }}>
                        <Typography
                            variant="h6"
                            style={{ marginRight: "10px", }}
                        >
                            <a href="#" style={{ color: "#fff" ,padding:'2px 10px' }}>Beranda</a>
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ marginRight: "10px", background: "#bbb",padding:'2px 10px' , borderRadius:'5px'  }}
                        >
                            <a href="#" style={{ color: "#000" }}>Video</a>
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ marginRight: "10px", color: "#fff",padding:'2px 10px' }}
                        >
                            <a href="#" style={{ color: "#fff" }}>Shorts</a>
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ marginRight: "10px", color: "#fff" }}
                        >
                            <a href="#" style={{ color: "#fff",padding:'2px 10px' }}>Live</a>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: "100px" } }} />
                <Videos videos={videos} />
            </Box>
        </Box>
    );
};

export default ChannelDetail;
