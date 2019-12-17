class Question {
    constructor(no, q, a, correct) {
        this.no = no;
        this.q = q;
        this.a = a;
        this.correct = correct
    }
}
let questionInitaliztion = function() {
    let q1 = new Question(1, "They _____ my brothers", ["am", "is", "are", "has"], "c");
    let q2 = new Question(2, "She is_____ cake", ["making", "doing", "hasing", "being"], "a");
    let q3 = new Question(3, "I'm _____ Auther", ["brought", "said", "told", "called"], "d");
    let q4 = new Question(4, "Is Susan _____ the house", ["on", "in", "for", "from"], "b");
    let q5 = new Question(5, "They _____ be my friends", ["might", "could", "have", "has"], "a");
    let q6 = new Question(6, "Have you _____ your work,yet ?", ["finishes", "finish", "finished", "finishing"], "c");
    let q7 = new Question(7, "I _____ doing my work since the morning", ["'ve been doing", "'ve been making", "am doing", "had done"], "a");
    let q8 = new Question(8, "The sun _____ from the east", ["rises", "is rising", "is going to rise", "will rise"], "a");
    let q9 = new Question(9, "You _____ me !", ["are beating me", "beat", "beated", "are always beating"], "d");
    let q10 = new Question(10, "She _____ for me", ["looks", "is looking", "look", "looked"], "b");

    return [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
}

let randomChoosing = function(array, amount) {
    let arr = [];
    while (arr.length < amount) {
        let index = Math.floor(Math.random() * array.length);
        if (!arr.includes(array[index])) {
            arr.push(array[index]);
        }
    }
    return arr;
}

let correctAnswers = function(array) {
    let arr = []
    array.forEach((ele) => {
        arr.push(ele.correct)
    })
    return arr;
}