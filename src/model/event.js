import * as Fookie from "fookie";
import { AsyncStore } from "../database/fookie-async-store";

export default async function () {
  return await Fookie.Core.model({
    name: "event",
    database: AsyncStore,
    schema: {
      name: {
        type: Fookie.Type.Text,
        required: true,
      },
      days: {
        type: Fookie.Type.Array,
        required: true,
        default: [],
      },
      times: {
        type: Fookie.Type.Array,
        required: true,
        default: [],
      },
    },
  });
}
