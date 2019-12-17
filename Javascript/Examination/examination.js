window.addEventListener("load", () => {
    let UIController = (function() {
        let slider_images = document.querySelectorAll(".slider-image");
        let questions_containers = document.querySelectorAll(".question");
        let aside = document.querySelector(".aside-container");
        let current_image = 0;
        let next_image = 1;
        let previous_image = slider_images.length - 1;
        let toggleActive = function(no) {
            document.querySelectorAll(".row")[no].classList.toggle("active");
        }
        let updateStatus = function(no) {
            document.querySelectorAll(".row p:last-child")[current_image].textContent = "solved"
        }
        let checkCurrent = function() {
            let flag = false;
            document.querySelectorAll(".slider-image-" + current_image + " .answer input[type='radio']").forEach((ele) => {
                if (ele.checked) {
                    flag = true
                }
            })
            return flag;
        }
        return {
            rendering: function(questions) {
                questions_containers.forEach((question, i) => {
                    question.textContent = questions[i].q;
                })
                slider_images.forEach((page, j) => {
                    Array.from(page.children[1].children).forEach((ans, index) => {
                        ans.insertAdjacentText("beforeend", questions[j].a[index])
                    })
                });

            },
            fillAside: function() { //no of Questions
                for (let i = 0; i < slider_images.length; i++) {
                    aside.insertAdjacentHTML("beforeend", "<div class='row'><p>" + (i + 1) + "</p><p>unsolved</p></div>")
                }
                toggleActive(current_image);
            },
            displayNext: function() {
                {
                    if (current_image == slider_images.length - 1) {
                        next_image = 0;
                    }
                    slider_images[current_image].style.animationName = "slider-collapse-forward-animation";
                    slider_images[next_image].style.animationName = "slider-expand-forward-animation";
                    toggleActive(current_image);
                    toggleActive(next_image);
                    if (checkCurrent()) {
                        updateStatus()
                    }
                    current_image = next_image;
                    next_image++;
                    previous_image = current_image == 0 ? slider_images.length - 1 : current_image - 1;
                }
            },
            displayPrevious: function() {
                if (current_image == 0) {
                    previous_image = slider_images.length - 1;
                }
                slider_images[current_image].style.animationName = "slider-collapse-backward-animation"
                slider_images[previous_image].style.animationName = "slider-expand-backward-animation"
                toggleActive(current_image);
                toggleActive(previous_image);
                if (checkCurrent()) {
                    updateStatus()
                }
                current_image = previous_image;
                previous_image--;
                next_image = current_image == slider_images - 1 ? 0 : current_image + 1;
            },
            jumpTo: function() {
                document.querySelectorAll(".row").forEach((indicator, index) => {
                    indicator.addEventListener("click", () => {
                        while (Math.abs(current_image - index) != 0) {
                            current_image < index ? document.getElementById("btnRight").click() : document.getElementById("btnLeft").click()
                        }
                    })
                })
            },
            getAnswers: function() {
                let ans = [];
                document.querySelectorAll(".slider-image").forEach((page, pageNo) => {
                    document.querySelectorAll(".slider-image-" + pageNo + " .answer input[type='radio']").forEach((input) => {
                            if (input.checked) {

                                ans.push(input.value);
                            }
                        })
                        // If user checked a radio and it was found
                        // The length will be bigger than the current page by 1
                        // If he checked [1,1,1,0,1] means he didnt check question no. 4
                        // By the third Iteration ans.lenght = 3 and pageNo = 2
                        // At the end of fourth the ans.Lenght = 3 and pageNo = 3
                        // Therefore pushes an empty element
                    if (ans.length == pageNo) {
                        ans.push("")
                    }
                })
                return ans;
            },
            updateTimer: function(timer) {
                document.querySelector(".timer").textContent = timer
            }

        }
    })();
    let DataController = (function() {
        let questions;
        return {
            questionImporting: function(amount) {
                questions = randomChoosing(questionInitaliztion(), amount);
                return questions;
            },
            validateAnswer(answers) {
                let correct = correctAnswers(questions)
                let final = 0;
                answers.forEach((ans, index) => {
                    if (ans != "" && ans == correct[index]) {
                        final++;
                    }
                })
                return final;
            }
        }
    })();
    let AppController = (function(UI, Data) {
        let timer = 15;
        let timeout, interval
        let questionSize = 5
            //Submitting Answer Handler
        let submitHandler = function() {
            clearInterval(interval);
            clearTimeout(timeout)
            let answers = UI.getAnswers();
            let final = Data.validateAnswer(answers);
            console.log(final)
            alert("You Got : " + final + " out of " + questionSize)
            window.location = "index.html"
        }
        return {
            init: function() {
                //Importing Question
                let questions = Data.questionImporting(questionSize);
                //Filling UI
                UI.rendering(questions);
                UI.fillAside();
                //Navigation Event Listeners
                document.getElementById("btnRight").addEventListener("click", UI.displayNext)
                document.getElementById("btnLeft").addEventListener("click", UI.displayPrevious)
                document.querySelectorAll(".row").forEach((row) => {
                        row.addEventListener("click", UI.jumpTo)
                    })
                    //Submitting Answers
                document.getElementById("submit").addEventListener("click", submitHandler)
                timeout = window.setTimeout(() => {
                    document.getElementById("submit").click();
                }, 17000);
                interval = window.setInterval(() => {
                    UI.updateTimer(timer--)
                }, 1000)

            }
        }
    })(UIController, DataController);

    AppController.init();
})