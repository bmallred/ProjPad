$(document).ready(function () {
    $(".addStory").click(function () {
        var elem = '<div class="story">'
            + '<div class="prod-col-1">'
            + '<p class="title" contenteditable="true">Story Title</p>'
            + '<p class="description" contenteditable="true">Description</p>'
            + '<button class="moveStory fatboy">Add To Sprint</button>'
            + '<button class="removeStory fatboy">Remove</button>'
            + '</div>'
            + '<div class="prod-col-2">'
            + '<select class="businessValue">'
            + '<option>0</option>'
            + '<option>3</option>'
            + '<option>5</option>'
            + '<option>7</option>'
            + '<option>11</option>'
            + '<option>13</option>'
            + '<option>17</option>'
            + '<option>19</option>'
            + '<option>23</option>'
            + '<option>29</option>'
            + '</select>'
            + '</div>'
            + '</div>';
            
        $(this).parents("section").find("article").append(elem);
        return false;
    });
    
    $(".moveStory").live("click", function () {
        $(this).parent().find("button").attr("disabled", "true");
        
        var title = $(this).parent().find(".title");
        var description = $(this).parent().find(".description");
        
        $(title).attr("contenteditable", "false");
        $(description).attr("contenteditable", "false");
        
        var elem = '<article class="sprint">'
            + '<div class="story">'
            + '<h2>Story: ' + $(title).text() + '</h2>'
            + '<p>' + $(description).html() + '</p>'
            + '<button class="closeStory fatboy">Close Story</button>'
            + '<button class="addTask fatboy">Add Task</button>'
            + '</div>'
            + '<div class="heading">'
            + '<div class="sprint-col-1">Task</div>'
            + '<div class="sprint-col-2">Time</div>'
            + '<div class="sprint-col-3">Owner(s)</div>'
            + '</div>'
            + '</article>';
        
        $(this).parents("section").next("section").find("header").after(elem);
        return false;
    });
    
    $(".removeStory").live("click", function () {
        $(this).parents(".story").remove();
        return false;
    });
    
    $(".closeStory").live("click", function () {
        var storyTime = $(this).parents("article").find(".taskTime");
        for (var i = 0; i < storyTime.length; i++) {
            $(storyTime[i]).text(0);
            $(storyTime[i]).blur();
        }
        
        var editables = $(this).parents("article").find("div[contenteditable='true']");
        for (var i = 0; i < editables.length; i++) {
            $(editables[i]).attr("contenteditable", "false");
        }
        
        $(this).parent().find(".addTask").attr("disabled", true);
        $(this).removeClass("closeStory");
        $(this).addClass("openStory");
        $(this).text("Open Story");
        return false;
    });
    
    $(".openStory").live("click", function () {
        var editables = $(this).parents("article").find("div[contenteditable='false']");
        for (var i = 0; i < editables.length; i++) {
            $(editables[i]).attr("contenteditable", true);
        }
        
        $(this).parent().find(".addTask").attr("disabled", false);
        $(this).removeClass("openStory");
        $(this).addClass("closeStory");
        $(this).text("Close Story");
        return false;
    });
    
    $(".addTask").live("click", function () {
        var elem = '<div class="task">'
            + '<div class="sprint-col-1 taskName" contenteditable="true">New Task</div>'
            + '<div class="sprint-col-2 taskTime" contenteditable="true">3</div>'
            + '<div class="sprint-col-3 taskOwner" contenteditable="true"></div>'
            + '</div>';
            
        $(this).parent().next(".heading").after(elem);
        return false;
    });
    
    $(".taskTime").live("blur", function () {
        var timeLeft = $(this).text();
        
        if (timeLeft.length == 0) {
            timeLeft = 0;
            $(this).text(0);
        }
        
        if (timeLeft == 0) {
            $(this).parents(".task").addClass("completed");
        }
        else {
            $(this).parents(".task").removeClass("completed");
        }
    });
    
    $(".prevScreen").click(previousScreen);
    $(".nextScreen").click(nextScreen);
    
    $("[contenteditable='true']").live("click", function () {
        document.execCommand('selectAll', false, null);
    });
    
    $(document.documentElement).keydown(function (event) {
        //var screen = $("section.current");
        
        switch (event.keyCode)
        {
            case 37: // left
                previousScreen();
                break;
                
            /*
            case 38: // up
                var selected = $(screen).find("div.selected");
                var prev = $(selected).prev();
                
                if ($(selected).length == 0) {
                    selected = $(screen);
                    prev = $(selected).find(".story").first();
                }
                
                if ($(prev).length > 0) {
                    $(prev).addClass("selected");
                    $(selected).removeClass("selected");
                }
                break;
            */
                
            case 39: // right
                nextScreen();
                break;
               
           /*
            case 40: // down
                var selected = $(screen).find("div.selected");
                var next = $(selected).next();
                
                if ($(selected).length == 0) {
                    selected = $(screen);
                    next = $(selected).find(".story").first();
                }
                
                if ($(next).length > 0) {
                    $(next).addClass("selected");
                    $(selected).removeClass("selected");
                }
                break;
            */
            
            /*
            case 46: // delete
            case 8: // backspace
                var selected = $(screen).find("div.selected");
                
                if ($(selected).length > 0) {
                    if ($(selected).hasClass("story")) {
                        var removeButton = $(selected).find("button.removeStory");
                        
                        if ($(removeButton).length > 0) {
                            $(removeButton).click();
                        }
                    }
                    else if ($(selected).hasClass("task")) {
                        $(selected).remove();
                    }
                }
                
                event.preventDefault();
                break;
            */
                
            default:
                //console.log(event.keyCode);
                break;
        }
    });
    
    $(".taskTime").live("keydown", numbersOnly);
    
    function numbersOnly(event) {
        switch (event.keyCode) {
            case 8: // backspace
            case 9: // tab
            case 46: // delete
            case 48: // 0
            case 49: // 1
            case 50: // 2
            case 51: // 3
            case 52: // 4
            case 53: // 5
            case 54: // 6
            case 55: // 7
            case 56: // 8
            case 57: // 9
                break;
                
            default:
                event.preventDefault();
                break;
        }
    }
    
    function previousScreen() {
        var screen = $("section.current");
        var prev = $(screen).prev("section");
        if ($(prev).length > 0) {
            $(prev).addClass("current");
            $(screen).removeClass("current");
        }
    }
    
    function nextScreen() {
        var screen = $("section.current");
        var next = $(screen).next("section");
        if ($(next).length != 0) {
            $(next).addClass("current");
            $(screen).removeClass("current");
        }
    }
});