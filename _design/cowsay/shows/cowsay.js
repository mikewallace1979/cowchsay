function(doc, req) {
    var cows = require("lib/cows");
    var extend_array = function(arr, token, length) {
        if (length === 0) {
            return arr;
        } else {
            arr.push(token);
            return extend_array(arr, token, length - 1);
        }
    };
    var wrap_to = 40;
    var cowtype = "classic";
    if ("cowtype" in req.query) {
        cowtype = req.query.cowtype;
    }
    var cow = cows[cowtype];
    var say;
    if (typeof doc !== "undefined" && doc !== null) {
         say = doc.cowtext;
    }
    if (typeof say === "undefined") {
        if ('cowtext' in req.query) {
            say = req.query.cowtext;
        } else {
            say = "Nothing for this cow to say.";
        }
    }
    var tokens = say.split(" ");
    // Greedy wrap algorithm (sorry Knuth...)
    var wrap = function(tokens, lines) {
        if (tokens.length === 0) {
            return lines;
        } else {
            var line = lines[lines.length - 1];
            var token = tokens.splice(0, 1)[0];
            if (typeof line != "undefined" &&
                    line.length + token.length < wrap_to) {
                lines[lines.length - 1] = [line, token].join(" ");
            } else {
                lines.push(token);
            }
            return wrap(tokens, lines);
        }
    };
    var endify = function(lines, length, index) {
        if (lines.length === 1) {
            return [["<", lines[0], ">"].join(" ")];
        } else {
            var done = false;
            var beginning = "|";
            var padding = extend_array([], " ",
                    length - lines[index].length).join("");
            var end = "|";
            if (index === 0) {
                beginning = "/";
                end = "\\";
            } else if (index === lines.length - 1) {
                beginning = "\\";
                end = "/";
                done = true;
            }
            lines[index] = [beginning, lines[index], padding, end].join(" ");
            if (done) {
                return lines;
            } else {
                return endify(lines, length, index + 1);
            }
        }
    };
    var wrapped = wrap(tokens, []);
    var head, tail;
    var length = wrap_to + 2;
    if (wrapped.length == 1) {
        length = wrapped[0].length + 2;
    }
    var ended = endify(wrapped, length - 2, 0);
    var top_and_bottom = extend_array([" "], "-", length).join("");
    var bubble = [top_and_bottom, ended.join("\n"),top_and_bottom].join("\n");
    return {
        headers: {
            "Content-Type": "text/plain"
        },
        body: [bubble, cow, "\n"].join("\n")
    };
}
