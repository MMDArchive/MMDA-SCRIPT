// ==UserScript==
// @name         MMDA Utilities
// @namespace    https://mmda.booru.org/
// @version      0.2.1
// @description  Adds some basic utilities to the mmda website
// @author       rnetiks
// @match        https://mmda.booru.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=booru.org
// @grant        none
// ==/UserScript==
const $ = (/** @type {string} */ selector) => document.querySelectorAll(selector);
const o$ = (/** @type {string} */ selector) => document.querySelector(selector);

(function () {
    'use strict';
    let styleText = 'body.alt{background-color:#2c3034;color:white;}body.alt .sidebar .space{color:white;}body.alt #post-view>b,body.alt #post-view>#psc{color:white;}body.alt #tag_list h5{color:white;}body.alt #paginator>b{color:white;}body.alt #user-index>p{color:white;}body.alt .highlightable tr{color:white;}body.alt body{color:white;}body.alt .highlightable ~ form{color:white;}body.alt #note-container{color:#7e7e7e;}body.alt #tag_list{overflow-y:auto;overflow-wrap:break-word;}body.alt #tag_list>ul>li span a[href^="index.php?page=post&s=list&tags=by"]{color:#00ff00!important;}body.alt #tag_list>ul{color:white;}body.alt #tag_list>ul>li:last-child{display:none;}@media screen and (max-width:800px){body.alt #tag_list{overflow-x:hidden;width:calc(100% + 15px)!important}body.alt .sidebar{width:100%!important;margin-right:0!important;float:none!important;order:2}body.alt .content{order:1;width:100%!important}body.alt #post-list{display:flex;flex-direction:column}body.alt .content>div{margin-bottom:0!important}}body.alt .quote{color:black;}body.alt .divTable{display:none;}body.alt:root{--input-border:8px;}body.alt .content>div>div:nth-child(6){margin-top:0!important;position:fixed;bottom:15px;right:15px;}body.alt .sidebar .space input:nth-child(1){border-top-left-radius:var(--input-border);border-top-right-radius:var(--input-border);}body.alt .sidebar .space input:nth-child(3){border-bottom-left-radius:var(--input-border);border-bottom-right-radius:var(--input-border);}body.alt .sidebar .space input{width:200px!important;box-sizing:border-box;border:none;padding:3px;text-align:center;outline:none;margin-top:0!important;}body.alt .sidebar .space form br,body.alt .sidebar .space small{display:none!important;}body.alt .pending-tag{background:#d6d6ff!important;color:black!important;}body.alt .highlightable tr:hover{background:#00c8ff!important;color:black;}body.alt .highlightable{border-spacing:0;border-collapse:separate;}body.alt .pending-tag td:nth-child(3){position:relative;}body.alt .pending-tag td:nth-child(3):after{content:"Pending";}body.filterOff .thumb a{display:block!important;}body.grid .thumb{display:flex;justify-content:center;align-items:center;margin-right:5px;margin-bottom:5px;width:130px!important;height:130px!important;}body.grid .thumb img{width:130px;height:130px;object-fit:cover;}.mmda-menu-title{background-color:#0077ff;padding:5px;padding-right:25px;}.mmda-menu-item{padding:10px;cursor:pointer;text-align:center;}.mmda-menu-item:hover{background-color:#234567;}.mmda-menu{position:absolute;background-color:#123456;}.mmda-button{cursor:pointer;padding:5px;background-color:#123456;color:white;}.no-outline{outline:none;}.no-resize{resize:none;}.checkbox{width:40px;height:20px;background:#43455c;border-radius:20px;position:relative;}.checkbox-label{width:18px;height:18px;margin:1px;background:white;position:absolute;padding:0;border-radius:20px;box-sizing:border-box;left:0;transition:.3s;}.checkbox input{display:none;}.checkbox input:checked + .checkbox-label{background:greenyellow;left:20px;}#console-input{position:absolute;bottom:0;left:0;width:100%;height:30px;background:rgba(0,0,0,.5);color:white;font-size:20px;box-sizing:border-box;border:none;outline:none;}';
    let style = document.createElement('style');
    style.innerHTML = styleText;
    document.head.appendChild(style);

    const MMDConsole = {
        Write: (/** @type {string} */ text) => {
            let console = $("#console-text-container")[0];
            let lastElement = console.querySelectorAll(".console-item");
            if (lastElement.length > 0) {
                let selectedElement = lastElement[lastElement.length - 1];
                selectedElement.innerHTML += text;
            } else {
                MMDConsole.WriteLine(text);
            }
        },
        WriteLine: (/** @type {string} */ text) => {
            let console = $("#console-text-container")[0];
            if (!console) return;
            let output = document.createElement("div");
            output.classList.add("console-item");
            output.style.backgroundColor = "#123456";
            output.style.color = "white";
            output.style.padding = "5px 15px";
            output.style.borderRadius = "5px";
            output.style.marginLeft = "10px";
            output.style.marginBottom = "5px";
            output.style.width = "fit-content";
            output.style.maxWidth = "88%";
            let consoleText = document.createElement("span");
            consoleText.innerHTML = text;
            consoleText.id = "console-text";
            output.appendChild(consoleText);
            // Add hidden time
            let time = document.createElement("span");
            time.style.display = "none";
            time.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`;
            time.id = "console-time";
            output.appendChild(time);
            console.appendChild(output);
        },
        CreateConsole: () => {
            if ($("#console").length <= 0) {
                let console = document.createElement("div");
                console.id = "console";
                console.style.position = "fixed";
                console.style.top = "0";
                console.style.right = "0";
                console.style.width = "400px";
                console.style.height = "700px";
                console.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                console.style.zIndex = "9999";

                let consoleText = document.createElement("div");
                consoleText.id = "console-text-container";
                consoleText.style.position = "absolute";
                consoleText.style.top = "35px";
                consoleText.style.left = "0";
                consoleText.style.width = "100%";
                consoleText.style.height = "100%";
                console.appendChild(consoleText);

                let consoleTitle = document.createElement("div");
                consoleTitle.id = "console-title";
                consoleTitle.style.position = "absolute";
                consoleTitle.style.top = "0";
                consoleTitle.style.left = "0";
                consoleTitle.style.width = "100%";
                consoleTitle.style.height = "30px";
                consoleTitle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                consoleTitle.style.color = "white";
                consoleTitle.style.fontSize = "20px";
                consoleTitle.style.fontWeight = "bold";
                consoleTitle.style.textAlign = "left";
                consoleTitle.style.paddingLeft = "10px";
                consoleTitle.style.boxSizing = "border-box";
                consoleTitle.innerText = "MMDA Console";
                console.appendChild(consoleTitle);

                let consoleClose = document.createElement("div");
                consoleClose.id = "console-close";
                consoleClose.style.position = "absolute";
                consoleClose.style.top = "0";
                consoleClose.style.right = "0";
                consoleClose.style.width = "30px";
                consoleClose.style.height = "30px";
                consoleClose.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                consoleClose.style.color = "white";
                consoleClose.style.fontSize = "20px";
                consoleClose.style.fontWeight = "bold";
                consoleClose.style.textAlign = "center";
                consoleClose.style.cursor = "pointer";
                consoleClose.innerText = "X";
                consoleClose.addEventListener("click", () => {
                    MMDStorage.Remove(Enum.Settings.ShowConsole.Key);
                    MMDConsole.Close();
                });

                console.appendChild(consoleClose);

                let consoleClear = document.createElement("div");
                consoleClear.id = "console-clear";
                consoleClear.style.position = "absolute";
                consoleClear.style.top = "30px";
                consoleClear.style.right = "0";
                consoleClear.style.height = "30px";
                consoleClear.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                consoleClear.style.color = "white";
                consoleClear.style.fontSize = "20px";
                consoleClear.style.fontWeight = "lighter";
                consoleClear.style.textAlign = "center";
                consoleClear.style.cursor = "pointer";
                consoleClear.innerText = "Clear";
                consoleClear.addEventListener("click", () => {
                    MMDConsole.Clear();
                });
                // On Hover
                consoleClear.addEventListener("mouseover", () => {
                    consoleClear.style.color = "red";
                }
                );
                // On Hover
                consoleClear.addEventListener("mouseout", () => {
                    consoleClear.style.color = "white";
                }
                );

                console.appendChild(consoleClear);

                let consoleInput = document.createElement("input");
                consoleInput.id = "console-input";
                consoleInput.placeholder = "Enter Command";


                console.appendChild(consoleInput);

                document.body.appendChild(console);
            }
        },
        Commands: Array(),
        Close: () => {
            let console = $("#console")[0];
            if (!console) {
                return;
            }
            console.remove();
        },
        Clear: () => {
            let console = $("#console-text")[0];
            console.innerHTML = "";
        },
        HasConsole: () => {
            return $("#console") !== null;
        },
        Colorize: (color, text) => {
            return `<span style="color: ${color};">${text}</span>`;
        },
        CreateCommand: (/** @type {string} */ command, /** @type {function} */ callback) => {
            let console = $("#console-input")[0];

            if (!console) {
                throw new Error("Console not found!");
            }

            MMDConsole.Commands.push(command);
            console.addEventListener("keydown", e => {
                // @ts-ignore
                if (e.key === "Enter") {
                    // @ts-ignore
                    let input = console.value;
                    if (input.startsWith(command)) {
                        callback(input.substring(command.length));
                        // @ts-ignore
                        console.value = "";
                    }
                }
            });
        },
        Log: (/** @type {string} */ text) => {
            if (MMDConsole.HasConsole()) {
                MMDConsole.WriteLine(text);
            }
        },
        CopyToClipboard: () => {
            let console = $("#console-text")[0];
            if (!console) {
                throw new Error("Console not found!");
            }
            let text = console.innerHTML;
            let textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            textArea.remove();

            MMDConsole.Log("Copied to clipboard!");

            return text;

        },
        ToJson: () => {
            let console = $("#console-text")[0];
            if (!console) {
                throw new Error("Console not found!");
            }
            let t = Array();
            console.querySelectorAll(".console-item").forEach(item => {
                t.push(JSON.stringify({ Message: item.querySelector("#console-text").innerHTML, Time: item.querySelector("#console-time").innerHTML }, null, 4));
            })
            return t;
        }
    }

    const MMDStorage = {
        Get: (/** @type {string} */ key) => {
            return localStorage.getItem(key);
        },
        Set: (/** @type {string} */ key, /** @type {string} */ value) => {
            localStorage.setItem(key, value);
        },
        Remove: (/** @type {string} */ key) => {
            localStorage.removeItem(key);
        },
        Has: (/** @type {string} */ key) => {
            return localStorage.getItem(key) !== null;
        },
        Clear: () => {
            localStorage.clear();
        },
        ToJson: () => {
            let json = {};
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (key) {
                    json[key] = localStorage.getItem(key);
                }
            }
            return json;
        },
        ToString: () => {
            let json = MMDStorage.ToJson();
            return JSON.stringify(json);
        },
    }

    const Enum = {
        Settings: {
            AutoSave: {
                Key: "autoSave",
                Default: true,
                Description: "Automatically save the model when changed.",
                Name: "Auto Save"
            },
            DarkMode: {
                Key: "darkMode",
                Default: false,
                Description: "Enable dark mode.",
                Name: "Dark Mode"
            },
            ShowConsole: {
                Key: "showConsole",
                Default: false,
                Description: "Show the console.",
                Name: "Show Console"
            },
            ReplaceUrl: {
                Key: "replaceUrl",
                Default: false,
                Description: "Replace valid urls with links.",
                Name: "Replace Url"
            },
            ContextMenu: {
                Key: "contextMenu",
                Default: true,
                Description: "Show context menu.",
                Name: "Context Menu"
            },
        }
    }

    const MMDPriviledges = {
        isAdmin: () => {
            fetch("https://mmda.booru.org/admin").then(res => {
                return res.url == "https://mmda.booru.org/admin/";
            });

            return false;
        },
        setAdmin: () => {
            if (MMDPriviledges.isAdmin()) {
                MMDStorage.Set("isUserAdmin", "true");
            } else {
                MMDStorage.Remove("isUserAdmin");
            }
        }
    }
    if (MMDStorage.Get(Enum.Settings.ShowConsole.Key) === "true") {
        MMDConsole.CreateConsole();
        MMDConsole.Log("Console opened!");
    }

    if (MMDStorage.Get("darkMode") === "true") {
        document.body.classList.add("alt");
        MMDConsole.Log("Dark mode enabled!");
    }

    if (MMDStorage.Get("grid") === "true") {
        document.body.classList.add("grid");
        MMDConsole.Log("Grid mode enabled!");
    }

    document.addEventListener("keydown", (e) => {
        // Console
        if (e.ctrlKey && e.key == "l") {
            e.preventDefault();
            if (MMDStorage.Get(Enum.Settings.ShowConsole.Key) == "true") {
                MMDStorage.Set(Enum.Settings.ShowConsole.Key, "false");
                MMDConsole.Close();
            } else {
                MMDStorage.Set(Enum.Settings.ShowConsole.Key, "true");
                MMDConsole.CreateConsole();
            }
        }
    });

    if (window.location.href.startsWith("https://mmda.booru.org/index.php?page=forum&s=view&id=")) {
        if(MMDStorage.Get(Enum.Settings.ContextMenu.Key) === "true") {
            $(".post").forEach(post => {
                post.querySelector("h6.author a:nth-child(2)")?.addEventListener("contextmenu", e => {
                    var t = document.body.querySelector(".mmda-menu");
                    if (t) {
                        t.remove();
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.target != null) {
                        const user = e.target.textContent;
                        const posLeft = e.clientX;
                        const posTop = e.clientY + window.scrollY;
                        const menu = document.createElement("div");
                        menu.classList.add("mmda-menu");
                        menu.style.left = posLeft - 15 + "px";
                        menu.style.top = posTop - 10 + "px";
    
                        const title = document.createElement("div");
                        title.classList.add("mmda-menu-title");
                        title.innerText = "MMDA Utilities";
                        menu.appendChild(title);
                        const mention = document.createElement("div");
                        mention.classList.add("mmda-menu-item");
                        mention.innerText = "Mention";
                        mention.addEventListener("click", () => {
                            const textarea = document.querySelector("#reply_box");
                            if (textarea != null) {
                                const cursorPosition = textarea.selectionStart;
                                const textBefore = textarea.value.substring(0, cursorPosition);
                                const textAfter = textarea.value.substring(cursorPosition);
                                textarea.value = textBefore + `@${user} ` + textAfter;
                                textarea.focus();
                            }
                            menu.remove();
                        });
    
                        const profile = document.createElement("div");
                        profile.classList.add("mmda-menu-item");
                        profile.innerText = "Profile";
                        profile.addEventListener("click", () => {
                            window.open(`https://mmda.booru.org/index.php?page=account_profile&uname=${user}`);
                            menu.remove();
                        });
    
                        menu.appendChild(mention);
                        menu.appendChild(profile);
                        menu.addEventListener("mouseleave", () => {
                            menu.remove();
                        });
                        document.body.appendChild(menu);
                    }
                });
            })
        }
    }
    if (window.location.href === "https://mmda.booru.org/index.php?page=account-options") {
        let container = $(".option table tbody")[0];
        if (container) {
            // Dark mode
            let row = document.createElement("tr");
            let col1 = document.createElement("td");
            col1.innerText = "Dark Mode";
            let col2 = document.createElement("td");
            let check = Switch(MMDStorage.Get("darkMode") === "true", "darkMode", value => {
                MMDStorage.Set("darkMode", value.toString());
                if (value) {
                    document.body.classList.add("alt");
                } else {
                    document.body.classList.remove("alt");
                }

                MMDConsole.Log("Dark mode " + (value ? "enabled" : "disabled"));
            });
            col2.appendChild(check);
            row.appendChild(col1);
            row.appendChild(col2);
            container.appendChild(row);

            // Grid
            row = document.createElement("tr");
            col1 = document.createElement("td");
            col1.innerText = "Grid Mode";
            col2 = document.createElement("td");
            check = Switch(MMDStorage.Get("grid") == "true", "grid", value => {
                MMDStorage.Set("grid", value.toString());
                
                MMDConsole.Log("Grid mode " + (value ? "enabled" : "disabled"));
            });
            col2.appendChild(check);
            row.appendChild(col1);
            row.appendChild(col2);
            container.appendChild(row);

            // Replace Url
            row = document.createElement("tr");
            col1 = document.createElement("td");
            col1.innerText = "Replace Url";
            col2 = document.createElement("td");
            check = Switch(MMDStorage.Get(Enum.Settings.ReplaceUrl.Key) == "true", Enum.Settings.ReplaceUrl.Key, value => {
                MMDStorage.Set(Enum.Settings.ReplaceUrl.Key, value.toString());
                MMDConsole.Log("Replace url " + (value ? "enabled" : "disabled")); 
            });
            col2.appendChild(check);
            row.appendChild(col1);
            row.appendChild(col2);
            container.appendChild(row);

            // Context Menu
            row = document.createElement("tr");
            col1 = document.createElement("td");
            col1.innerText = "Context Menu";
            col2 = document.createElement("td");
            check = Switch(MMDStorage.Get(Enum.Settings.ContextMenu.Key) == "true", Enum.Settings.ContextMenu.Key, value => {
                MMDStorage.Set(Enum.Settings.ContextMenu.Key, value.toString());
                MMDConsole.Log("Context menu " + (value ? "enabled" : "disabled"));
            });
            col2.appendChild(check);
            row.appendChild(col1);
            row.appendChild(col2);
            container.appendChild(row);

            // Show Console
            row = document.createElement("tr");
            col1 = document.createElement("td");
            col1.innerText = "Console";
            col2 = document.createElement("td");
            check = Switch(MMDStorage.Get(Enum.Settings.ShowConsole.Key) == "true", Enum.Settings.ShowConsole.Key, value => {
                MMDStorage.Set(Enum.Settings.ShowConsole.Key, value.toString());
                if (value) {
                    MMDConsole.CreateConsole();
                    MMDConsole.Log("Console opened!");
                } else {
                    MMDConsole.Close();
                }
            });
            col2.appendChild(check);
            row.appendChild(col1);
            row.appendChild(col2);
            container.appendChild(row);

            row = document.createElement("tr");
            col1 = document.createElement("td");
            col1.innerText = "Dropdown Selection";
            let name = "dropdownSelection";
            col2 = document.createElement("td");
            let values = [
                {value: "bottomLeft", text: "Bottom Left"}, 
                {value: "bottomRight", text: "Bottom Right"}, 
                {value: "topLeft", text: "Top Left"}, 
                {value: "topRight", text: "Top Right"}
            ];
            let dropdown = Dropdown(values, value => {
                MMDStorage.Set(name, value);
                MMDConsole.Log("Dropdown selection set to " + value);
            });
            col2.appendChild(dropdown);
            row.appendChild(col1);
            row.appendChild(col2);
            container.appendChild(row);
        }
    }
    if (window.location.href.startsWith("https://mmda.booru.org/index.php?page=post&s=view&id=")) {
        if(MMDStorage.Get(Enum.Settings.ReplaceUrl.Key) == "true") {
            let s = $("#tag_list")[0];
            s.innerHTML = s.innerHTML.replace(/\bhttps?\S+/g, (match) => {
                return `<a href="${match}" target="_blank">${match}</a>`;
            });
    
            MMDConsole.Log(`[${MMDConsole.Colorize("green", "UI")}] Tags are now linked to their respective links.`);
        }
    }
})();

/**
 * @param {Object[]} options
 * @param {(arg0: any) => void} OnChange
 */
function Dropdown(options, OnChange){
    let dropdown = document.createElement("select");
    options.forEach(element => {
        let option = document.createElement("option");
        option.value = element.value;
        option.innerText = element.text;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", e => {
        OnChange(e.target.value);
    }
    );
    return dropdown;
}

/**
 * @param {boolean} checked
 * @param {(arg0: any) => void} OnChange
 * @param {string} id
 */
function Switch(checked, id, OnChange){
    let checkboxOuter = document.createElement("div");
    checkboxOuter.classList.add("checkbox");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener("change", e => {
        OnChange(e.target.checked);
    });
    checkbox.id = id;
    let styleLabel = document.createElement("label");
    styleLabel.classList.add("checkbox-label");
    styleLabel.htmlFor = id;
    checkboxOuter.appendChild(checkbox);
    checkboxOuter.appendChild(styleLabel);
    return checkboxOuter;
}