import React from "react";
import PropTypes from "prop-types";
import DropzoneComponent from "react-dropzone-component";

class Dropzone extends React.Component {
  componentConfig = {
    addRemoveLinks: false,
    iconFiletypes: [".jpg", ".png", ".gif"],
    showFiletypeIcon: true,
    postUrl: this.props.apiUrl
  };

  djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif",
    paramName: `files[${this.props.fieldName}]`,
    params: {
      field: this.props.fieldName
    },
    createImageThumbnails: true,
    maxFilesize: 10,
    maxThumbnailFilesize: 10,
    dictDefaultMessage: `<p class="upload-text">
      <span>Click or drag file to this area to upload.</span>
      <span class="types">(JPG under 10MB. Support for a single or bulk upload.)</span>
    </p>`,
    dictFileTooBig: "Max filesize: 10MiB. Current - {{filesize}}MiB",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  };

  eventHandlers = {
    addedfile: file => {
      this.props.handleAddFile(file);
    },
    success: (file, response) => {
      this.props.handleUploaded({
        response,
        file
      });
    },
    error: (file, error) => {
      this.props.handleError({
        file,
        error
      });
    },
    thumbnail: (file, thumbs) => {
      this.props.handleThumbnailCreated({
        src: thumbs,
        file
      });
    }
  };

  render() {
    return (
      <DropzoneComponent
        config={this.componentConfig}
        eventHandlers={this.eventHandlers}
        djsConfig={this.djsConfig}
      />
    );
  }
}

Dropzone.propTypes = {
  handleAddFile: PropTypes.func.isRequired,
  handleUploaded: PropTypes.func,
  handleError: PropTypes.func,
  handleThumbnailCreated: PropTypes.func,
  apiUrl: PropTypes.string,
  fieldName: PropTypes.string
};

Dropzone.defaultProps = {
  apiUrl: "/api/files",
  fieldName: "image",
  handleUploaded: () => {},
  handleError: () => {},
  handleThumbnailCreated: () => {}
};

export default Dropzone;
