// @ts-check
import Debug from "debug";

/**
 * Creates a debug instance with an optional immediate log.
 * @param {string} namespace - The namespace for the debug instance.
 * @returns {(message: string) => void} A function that logs messages with the specified namespace.
 */
const debug = (namespace) => {
  // Create the debug instance with a namespace
  const debugInstance = Debug(`app:${namespace}`);

  /**
   * Logs a message using the debug instance.
   * @param {string} message - The message to be logged.
   * @returns {void}
   */
  return (message) => debugInstance(message);
};

export default debug;
