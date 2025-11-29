"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RANNTA = void 0;
class RANNTA {
    constructor(config) {
        this.config = config;
    }
    async ping() {
        return "RANNTA SDK online";
    }
}
exports.RANNTA = RANNTA;
