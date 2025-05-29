export function isSuccess(docs, res) {
  if (res?.createdId) {
    console.log(`${docs._id} - importResult: ${JSON.stringify(res)}`);
    return true;
  }
  return false;
}

export function isAlreadyImport(docs, res) {
  if (res?.hasError && res?.data?.code == "ALREADY_IMPORT_ERROR") {
    console.log(`${docs._id} - importResult: ${JSON.stringify(res?.data)}`);
    return true;
  }
  return false;
}

export function isNotFound(docs, res) {
  if (res?.hasError && res?.data?.code == "RESOURCE_NOT_FOUND_ERROR") {
    console.log(`${docs._id} - importResult: ${JSON.stringify(res?.data)}`);
    return true;
  }
  return false;
}

export function isNotReady(docs, res) {
  if (res?.hasError && res?.data?.code == "STATUS_NOT_READY_ERROR") {
    console.log(`${docs._id} - importResult: ${JSON.stringify(res?.data)}`);
    return true;
  }
  return false;
}
