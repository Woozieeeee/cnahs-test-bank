"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeName = void 0;
const normalizeName = (name) => {
    return name.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();
};
exports.normalizeName = normalizeName;
