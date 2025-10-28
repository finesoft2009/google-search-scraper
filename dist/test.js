"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleSearch_1 = require("./googleSearch");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Basic search with default options
            const results = yield googleSearch_1.GoogleSearch.search('TypeScript programming', {
                numResults: 10,
                lang: 'en',
                safe: 'active',
                unique: true // Only get unique results
            });
            console.log('Results:\n');
            console.log(results);
        }
        catch (error) {
            console.error('Search failed:', error);
        }
    });
}
test();
//# sourceMappingURL=test.js.map