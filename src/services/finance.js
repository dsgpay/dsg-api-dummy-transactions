// @ts-check
import { finance } from "../config/env.js";
import { generateToken } from "../helpers/auth.js";
import { request } from "../helpers/request.js";

/**
 * importSTP by finance api
 * @async
 * @param {{ _id: any; }} param
 * @returns {Promise<object>}
 */
export const importSTP = async ({ _id }) => {
  try {
    return await request({
      method: "POST",
      url: finance?.url + "/v1/stp-payment/import",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + generateToken(),
      },
      data: {
        _id: _id?.toString(),
        useNow: true,
        useWorker: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * importSTP by finance api
 * @async
 * @param {{ _id: any; }} param
 * @returns {Promise<object>}
 */
export const importFeeSTP = async ({ _id }) => {
  try {
    return await request({
      method: "POST",
      url: finance?.url + "/v1/ticket-fee/single",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + generateToken(),
      },
      data: {
        _id: _id?.toString(),
        // useNow: true,
        // useWorker: false,
      },
    });
  } catch (error) {
    throw error;
  }
};
