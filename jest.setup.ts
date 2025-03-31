import { TextEncoder, TextDecoder } from "util";
import fetchMock from "jest-fetch-mock";

Object.assign(global, { TextDecoder, TextEncoder });
fetchMock.enableMocks();
