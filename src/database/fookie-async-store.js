import * as lodash from "lodash";
import { v4 } from "uuid";
import * as Fookie from "fookie";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { Text, Plain, Array, Boolean, Buffer, Char, Function, Float, Integer } =
  Fookie.Type;
export const AsyncStore = {
  pk: "id",
  pk_type: Text,
  types: [Text, Plain, Array, Boolean, Buffer, Char, Function, Float, Integer],
  connect: async function () {
    return true;
  },
  disconnect: async function () {
    return true;
  },
  modify: async function (model) {
    const si = async function (k, v) {
      await AsyncStorage.setItem(k, JSON.stringify(v));
    };
    const gi = async function (k) {
      const val = await AsyncStorage.getItem(k);
      return !!val ? JSON.parse(val) : false;
    };

    if (!lodash.isArray(await gi(model.name))) {
      await si(model.name, []);
    }
    model.methods = {};

    model.methods.read = async function (_payload) {
      const pool = await gi(model.name);
      const filter = _payload.query.filter;
      const attributes = ["id"].concat(_payload.query.attributes);
      let res = poolFilter(pool, filter);
      res = res.map(function (entity) {
        return lodash.pick(entity, attributes);
      });
      res = lodash.slice(
        res,
        _payload.query.offset,
        _payload.query.offset + _payload.query.limit
      );
      _payload.response.data = res;
    };

    model.methods.create = async function (_payload) {
      const pool = await gi(model.name);
      const attributes = ["id"].concat(_payload.query.attributes);
      _payload.body.id = v4().replace("-", "");
      pool.push(_payload.body);
      await si(model.name, pool);
      _payload.response.data = lodash.pick(_payload.body, attributes);
    };

    model.methods.update = async function (_payload) {
      const pool = await gi(model.name);
      const ids = poolFilter(pool, _payload.query.filter).map(function (i) {
        return i[model.database.pk];
      });
      for (const item of pool) {
        for (const key in _payload.body) {
          if (ids.includes(item.id)) {
            item[key] = _payload.body[key];
          }
        }
      }
      await si(model.name, pool);
      _payload.response.data = true;
    };

    model.methods.delete = async function (_payload) {
      const pool = await gi(model.name);
      const filtered = poolFilter(pool, _payload.query.filter).map(function (
        f
      ) {
        return f.id;
      });
      const rejected = lodash.reject(pool, function (entity) {
        return filtered.includes(entity.id);
      });
      await si(model.name, rejected);
      _payload.response.data = true;
    };

    model.methods.count = async function (_payload) {
      const pool = await gi(model.name);
      _payload.response.data = poolFilter(pool, _payload.query.filter).length;
    };
  },
};

function poolFilter(pool, filter) {
  return pool.filter(function (entity) {
    for (const field in filter) {
      const value = filter[field];
      if (typeof value === "object") {
        if (value.gte && entity[field] < value.gte) {
          return false;
        }
        if (value.gt && entity[field] <= value.gt) {
          return false;
        }
        if (value.lte && entity[field] > value.lte) {
          return false;
        }
        if (value.lt && entity[field] >= value.lt) {
          return false;
        }
        if (value.inc && !entity[field].includes(value.inc)) {
          return false;
        }
        if (value.eq && entity[field] !== value.eq) {
          return false;
        }
        if (value.not && entity[field] === value.not) {
          return false;
        }
        if (value.in && !lodash.includes(value.in, entity[field])) {
          return false;
        }
        if (value.not_in && lodash.includes(value.not_in, entity[field])) {
          return false;
        }
      } else if (entity[field] !== value) {
        return false;
      }
    }
    return true;
  });
}
