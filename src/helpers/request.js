// @ts-check
import axios from "axios";

import debug from "./debug.js";

const logger = debug("helpers:request");

const errorCodes = {
  ECONNABORTED: "Request Timeout",
  ECONNREFUSED: "Server is offline or Refused the connection",
  ENOTFOUND: "DNS lookup failed",
  EAI_AGAIN: "DNS lookup timed out",
};

const handleResponse = (response) => {
  // logger(`response.status: ${response.status}`);
  return response.data;
};
const handleError = (error) => {
  if (error.response) {
    // Request made and server responded
    const { data, status, headers } = error.response;

    return {
      status: status,
      code: error.code || null,
      message: error.message || null,
      data: data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: errorCodes[error.code] || null,
      code: error.code || null,
      message: error.message || null,
      data: `No response received. Request was sent but no reply.`,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    logger(`Error - ${error.message}`);
    return {
      status: errorCodes[error.code] || null,
      code: null,
      message: error.message || null,
      data: error.message || null,
    };
  }
};

export const request = async (config) => {
  return axios(config).then(handleResponse).catch(handleError);
};
