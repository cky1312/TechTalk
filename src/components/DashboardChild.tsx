import React from "react";
import { Box, Modal, Typography } from "@mui/material";
export default class DashboardChild extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: props.url,
      open: false,
      style: {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      },
    };
  }

  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  renderModal = () => {
    return (
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={this.state.style}>
          <iframe
            frame-ancestors="none"
            src=""
            name="myFrame"
            height={600}
            width="100%"
          ></iframe>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    );
  };

  setUrl = (url: string) => {
    this.setState({ url: url, open: !this.state.open });
  };

  renderIframe = (url: string) => {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`${url}`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };
  renderNews = (news: any) => {
    return (
      <div className="p-3 w-50" style={{ height: "400px" }}>
        <div
          className="border rounded p-3"
          style={{ height: "100%", overflow: "scroll" }}
        >
          <h6>{news.title}</h6>
          <img
            src={`${news.urlToImage}`}
            alt=""
            style={{ height: "300px", width: "100%" }}
          />
          <p>{news.description}</p>
        </div>
      </div>
    );
  };

  render(): React.ReactNode {
    return (
      <div className="mt-4">
        {this.renderModal()}
        <div
          onClick={this.props.back}
          role="button"
          className="d-flex align-items-center"
        >
          <img src="static/icons/back-arrow-square.svg" alt="" /> &nbsp;
          <span>BACK</span>
        </div>
        <div className="mt-4 d-flex justify-content-center">
          {this.props.resources.map((resource: any) => {
            return (
              <div className="p-2">
                <div className="border rounded p-2">
                  {this.renderIframe(resource.url)}
                  <h5 className="text-center">
                    <a
                      href={`${resource.channelUrl}`}
                      target="_blank"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Visit Channel for more knowledge"
                    >
                      {resource.name}
                    </a>
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {this.props.data.map((news: any) => {
            return this.renderNews(news);
          })}
        </div>
      </div>
    );
  }
}
