// ==UserScript==
// @name         MMDA Utilities
// @namespace    https://mmda.booru.org/
// @version      0.1
// @description  Adds some basic utilities to the mmda website
// @author       rnetiks
// @match        https://mmda.booru.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=booru.org
// @grant        none
// ==/UserScript==
const $ = (/** @type {string} */ selector) => document.querySelectorAll(selector);
const o$ = (/** @type {string} */ selector) => document.querySelector(selector);
let isConsoleOpen = false;
class StyleFactory {
    IndexGrid = false
    AltStyle = false
    DisableFilter = false

    #n = "";

    #AltStyleToggle() {
        this.#n += `body {
            background-color: #2c3034;
        }
        .sidebar .space{
            color: white;
        }
        #post-view > b, #post-view > #psc{
            color: white;
        }#tag_list h5{
            color: white;
        }#paginator > b{
            color: white;
        }
        #user-index > p {
            color: white;
        }.highlightable tr{
            color: white;
        }
        body{
            color: white;
        }
        .highlightable ~ form{
            color: white;
        }
        #note-container{
            color: #7e7e7e;
        }
        
        #tag_list{
            overflow-y: auto;
            overflow-wrap: break-word;
        }
        #tag_list > ul > li span a[href^="index.php?page=post&s=list&tags=by"]{
            color: #00ff00 !important;
        }
        #tag_list > ul {
            color: white;
        }
        #tag_list>ul>li:last-child{
            display: none;
        }@media screen and (max-width: 800px){
            #tag_list{
                overflow-x: hidden;
                width: calc(100% + 15px) !important;
            }
            .sidebar{
                width: 100% !important;
                margin-right: 0 !important;
                float: none !important;
                order: 2;
            }
            .content{
                order: 1;
                width: 100% !important;
            }
            #post-list{
                display: flex;
                flex-direction: column;
            }
            .content > div{
                margin-bottom: 0 !important;
            }
        }
        .quote{
            color: black;
        }
        
        .divTable{
            display: none
        }
        
        :root {
            --input-border: 8px;
        }
        .content > div > div:nth-child(6){
            margin-top: 0 !important;
            position: fixed;
            bottom: 15px;
            right: 15px;
        }
        .sidebar .space input:nth-child(1){
            border-top-left-radius: var(--input-border);
            border-top-right-radius: var(--input-border);
        }
        
        .sidebar .space input:nth-child(3){
            border-bottom-left-radius: var(--input-border);
            border-bottom-right-radius: var(--input-border);
        }
        
        .sidebar .space input{
            width: 200px !important;
            box-sizing: border-box;
            border: none;
            padding: 3px;
            text-align: center;
            outline: none;
            margin-top: 0 !important;
        }
        .sidebar .space form br, .sidebar .space small{
            display: none !important;
        }
        
        
        .pending-tag{
            background: #d6d6ff !important;
            color: black !important;
        }
        
        .highlightable tr:hover{
            background: #00c8ff !important;
            color: black;
        }
        .highlightable {
            border-spacing: 0;
            border-collapse: separate;
        }
        .pending-tag td:nth-child(3){
            position: relative;
        }
        .pending-tag td:nth-child(3):after{
            content: "Pending"
        }
        
        
        `;
    }
    #DisableFilterToggle() {
        this.#n += `.thumb a {
            display: block !important;
        }`;
    }
    #IndexGridToggle() {
        this.#n += `.thumb{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
            margin-bottom: 5px;
            width: 130px !important;
            height: 130px !important;
        }
        .thumb img{
            width: 130px;
            height: 130px;
            object-fit: cover;
        }`;
    }
    /**
     * @param {{IndexGrid?: boolean; AltStyle?: boolean; DisableFilter?: boolean; }} options
     */
    constructor(options) {
        // Set options from json object
        for (let key in options) {
            if (options[key]) {
                this[key] = options[key];
            }
        }
    }
    createStyle() {
        this.#n = ".mmda-menu-title{background-color: #0077ff;padding: 5px;padding-right: 25px;}.mmda-menu-item {padding: 10px;cursor: pointer;text-align: center;}.mmda-menu-item:hover{background-color: #234567;}.mmda-menu{position: absolute;background-color: #123456;}";
        this.#n += `
        .mmda-console{
            position: fixed;
            background-color: #12345677;
            border: 1px solid #0077ff;
            border-radius: 5px;
            padding: 5px;
            color: #0077ff;
            font-size: 12px;
            font-family: monospace;
            overflow-y: auto;
            overflow-x: hidden;
            height: 80vh;
            width: 300px;
            z-index: 99999;
            right: 0;
            top: 0;
           box-size: border-box;
        }
        .mmda-console-close{
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            padding: 5px;
            background-color: red;
            width: 10px;
            height: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .mmda-button{
            cursor: pointer;
            padding: 5px;
            background-color: #123456;
            color: white;
        }
        .slider-checkbox{
            display: none;
        }
        .slider-outer{
            display: inline-block;
            width: 40px;
            background: #fff;
            border-radius: 34px;
            position: relative;
            margin-right: 15px;
            padding: 2px;
        }
        .slider-inner{
            padding: 2px;
            background-color: #595e72;
            width: 15px;
            height: 15px;
            border-radius: 15px;
            cursor: pointer;
        }
        .no-outline{
            outline: none;
        }
        .no-resize{
            resize: none;
        }`
        if (this.IndexGrid) {
            console.log("IndexGrid");
            this.#IndexGridToggle();
        }
        if(this.AltStyle){
            console.log("DarkMode");
            this.#AltStyleToggle();
        }
        if (this.DisableFilter) {
            console.log("DisableFilter");
            this.#DisableFilterToggle();
        }
        this.#apply();
    }

    #apply() {
        let styleElement = document.createElement("style");
        styleElement.innerHTML = this.#n;
        document.head.appendChild(styleElement);
    }
}

// Create colored text
function createColoredText(text, color) {
    return `<span style="color: ${color}">${text}</span>`;
}

// Function to add text to console
function consoleLog(text) {
    let console = document.querySelector(".mmda-console");
    // div
    let div = document.createElement("div");
    div.innerHTML = text;
    // Check if console exists
    if (console) {
        console.appendChild(div);
    } else {
        // Create console
        let console = document.createElement("div");
        console.classList.add("mmda-console");
        console.appendChild(div);
        document.body.appendChild(console);

        // Add close button
        let close = document.createElement("div");
        close.classList.add("mmda-console-close");
        close.innerHTML = "X";
        console.appendChild(close);
        close.addEventListener("click", () => {
            console.remove();
            isConsoleOpen = false;
        });
    }
}
function setAdmin() {
    consoleLog("[Fetch] Setting admin...");
    fetch("https://mmda.booru.org/admin").then(res => {
        if (res.url == "https://mmda.booru.org/admin/") {
            localStorage.setItem("Admin", "true");
            consoleLog("[Storage] Admin set!");
        } else {
            consoleLog("[Storage] Admin not set!");
        }
    });
}
(function () {
    'use strict';
    isConsoleOpen = localStorage.getItem("Console") == "true";
    // If ctrl and l pressed open a console
    document.addEventListener("keydown", (e) => {

        if (e.ctrlKey && e.key == "l") {
            e.preventDefault();
            if (localStorage.getItem("Console")) {
                localStorage.removeItem("Console");
                // close the console and remove it from the DOM if it exists
                let console = document.querySelector(".mmda-console");
                if (console) {
                    isConsoleOpen = false;
                    consoleLog(`[${createColoredText("Console", "green")}] Console will automatically close in 5 seconds...`);
                    // Wait 3 seconds
                    setTimeout(() => {
                        console.remove();
                    }, 5000);
                }
            } else {
                isConsoleOpen = true;
                localStorage.setItem("Console", "true");
                let console = document.querySelector(".mmda-console");
                if (!console) {
                    consoleLog(`[${createColoredText("Console", "green")}] Console opened!`);
                }
            }
            // Check if console is already open
        }
    });
    // Auto open the console if it is set
    if (localStorage.getItem("Console")) {
        consoleLog(`[${createColoredText("Console", "green")}] Console opened!`);
    }

    Init();
    const _index = localStorage.getItem("IndexGrid") !== null && localStorage.getItem("IndexGrid") == "true";
    const dm = localStorage.getItem("AltStyle") !== null && localStorage.getItem("AltStyle") == "true";
    const _df = localStorage.getItem("DisableFilter") !== null && localStorage.getItem("DisableFilter") == "true";
    console.log(_index, dm, _df);
    let style = new StyleFactory({
        IndexGrid: _index,
        AltStyle: dm,
        DisableFilter: _df
    });
    style.createStyle();

    // Forum
    if (window.location.href.startsWith("https://mmda.booru.org/index.php?page=forum&s=view&id=")) {
        $(".post").forEach(post => {
            post.querySelector("h6.author a:nth-child(2)")?.addEventListener("contextmenu", e => {
                // Delete old menu if there is one
                if (document.body.querySelector(".mmda-menu")) {
                    document.body.querySelector(".mmda-menu").remove();
                }
                // Prevent the default menu from showing
                e.preventDefault();
                e.stopPropagation();
                // Create the menu
                if (e.target != null) {
                    const user = e.target.textContent;
                    const posLeft = e.clientX;
                    // mouse position relative to the page with scroll offset
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
                            // Add value at cursor position
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
                        if (isConsoleOpen) {
                            consoleLog(`[${createColoredText("Menu", "green")}] Closed menu for ${createColoredText(user, "white")}`);
                        }
                    });
                    document.body.appendChild(menu);
                    if (isConsoleOpen) {
                        consoleLog(`[${createColoredText("Menu", "green")}] Created context menu for ${createColoredText(user, "white")}`);
                    }
                }
            });
        })
    }
    // Options
    if (window.location.href === "https://mmda.booru.org/index.php?page=account-options") {
        let container = $(".option table tbody")[0];
        // Create new tr with label and checkbox
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText = "Alt Style";
        tr.appendChild(td);
        td = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = localStorage.getItem("AltStyle") === "true";
        checkbox.addEventListener("change", e => {
            localStorage.setItem("AltStyle", e.target.checked.toString());
        });
        td.appendChild(checkbox);
        tr.appendChild(td);
        container.appendChild(tr);
        if (isConsoleOpen) {
            consoleLog("[UI] Alt Style added!");
        }

        // Create new tr with label and checkbox
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerText = "Index Grid";
        tr.appendChild(td);
        td = document.createElement("td");
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = localStorage.getItem("IndexGrid") === "true";
        checkbox.addEventListener("change", e => {
            // Save value to storage as a string
            localStorage.setItem("IndexGrid", e.target.checked.toString());
        });
        td.appendChild(checkbox);
        tr.appendChild(td);
        container.appendChild(tr);
        if (isConsoleOpen) {
            consoleLog("[UI] Index Grid added!");
        }

        // Create new tr with label and checkbox
        // If localstorage admin is true, show the option
        if (localStorage.getItem("Admin") === "true") {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerText = "Admin Mode";
            // Add tooltip to td
            td.title = "This is intended for admins only, normal users will not be able to use this feature.";
            tr.appendChild(td);
            td = document.createElement("td");
            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = localStorage.getItem("AdminMode") === "true";
            checkbox.addEventListener("change", e => {
                // Save value to storage as a string
                localStorage.setItem("AdminMode", e.target.checked.toString());
            });
            td.appendChild(checkbox);
            tr.appendChild(td);
            container.appendChild(tr);
            if (isConsoleOpen) {
                consoleLog("[UI] Admin Mode added!");
            }
        }

        // Create new tr with label and checkbox
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerText = "Disable filter";
        tr.appendChild(td);
        td = document.createElement("td");
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = localStorage.getItem("DisableFilter") === "true";
        checkbox.addEventListener("change", e => {
            // Save value to storage as a string
            localStorage.setItem("DisableFilter", e.target.checked.toString());
        }
        );
        td.appendChild(checkbox);
        tr.appendChild(td);
        container.appendChild(tr);
        if (isConsoleOpen) {
            consoleLog("[UI] Disable Filter added!");
        }



        // Create new tr with label and Button
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerText = "Re-Initialize";
        tr.appendChild(td);
        td = document.createElement("td");
        let button = document.createElement("button");
        button.innerText = "Re-Initialize";
        button.classList.add("mmda-button");
        button.addEventListener("click", e => {
            e.preventDefault();
            Init(true);
        });
        td.appendChild(button);
        tr.appendChild(td);
        container.appendChild(tr);
        if (isConsoleOpen) {
            consoleLog("[UI] Re-Initialize added!");
        }

        // Create new tr with label and code
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerText = "Info";
        tr.appendChild(td);
        td = document.createElement("td");
        let code = document.createElement("div");
        code.innerText = `// Keybinds
        CTRL + L: Toggle console`;
        code.style.borderLeft = "5px solid #0077ff";
        code.style.borderRadius = "5px";
        code.style.paddingLeft = "10px";
        td.appendChild(code);
        tr.appendChild(td);
        container.appendChild(tr);
    }
    // Post
    if (window.location.href.startsWith("https://mmda.booru.org/index.php?page=post&s=view&id=")) {
        let s = $("#tag_list")[0];
        // replace all http text with a link
        s.innerHTML = s.innerHTML.replace(/\bhttps?\S+/g, (match) => {
            return `<a href="${match}" target="_blank">${match}</a>`;
        });

        s = $("#note-container")[0];
        // replace all http on normal text with a link that is not an img tag

        if (isConsoleOpen) {
            consoleLog(`[${createColoredText("UI", "green")}] Replaced http/https links.`);
        }
    }
})();

function Init(ignoreCheck = false) {
    if (localStorage.getItem("Initialized") === null || ignoreCheck) {
        consoleLog("Initializing...");
        localStorage.setItem("Initialized", "true");
        consoleLog("[Storage] Initialized!");
        setAdmin();
    }
}
