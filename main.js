function calcMax(factor, capacity, max) {
    return Math.pow(factor, max) * Math.pow(1 - factor, capacity - max);
}

function factorial(num) {
    let result = num;

    if (num === 0 || num === 1) 
    return 1; 
    while (num > 1) { 
        num--;
        result = result * num;
  }
  return result;
}

function choose(capacity, max) {
    return parseFloat(factorial(capacity))/ parseFloat(factorial(capacity - max) * factorial(max))
}

function probCalc (factor, capacity, max, operation) {
    sum = 0
    if (operation == "exactlyMax") {
        return calcMax(factor, capacity, max) * choose(capacity, max);
    }

    else if (operation == "atLeastMax") {
        for (let i = 0; i < max; i += 1) {
            sum += calcMax(factor, capacity, i) * choose(capacity, i);
        }
        return (1 - sum);
    }
    else if (operation == "atMostMax") {
        for (let i = 0; i < max; i += 1) {
            sum += calcMax(factor, capacity, i) * choose(capacity, i);
        }
        return sum;
    }
}

function check (facVal, capVal, maxVal) {
    let valid = true, factorErr = "", maxErr = "", factor = "", max = "", capacity = "";
    factor = document.getElementById("factor");
    factorErr = document.getElementById("factorErr");
    if (facVal > 1 || facVal < 0) {
        valid = false;
        factor.classList.add("err");
        factorErr.innerHTML = "Must be between 0 and 1 inclusive\r\n";
        factorErr.style.display = "block";
    } else {
        factor.classList.remove("err");
        factorErr.innerHTML = "";
        factorErr.style.display = "none";
    }

    max = document.getElementById("max");
    capacity = document.getElementById("capacity")
    maxErr = document.getElementById("maxErr");
    if (maxVal > capVal) {
        valid = false;
        max.classList.add("err");
        maxErr.innerHTML = "Max cannot be greater than Capacity\r\n";
        maxErr.style.display = "block";
    } else {
        max.classList.remove("err");
        maxErr.innerHTML = "";
        maxErr.style.display = "none";
    }
    return valid;
}

function calculateProbability () {
    let factor = parseFloat(document.getElementById('factor').value);
    let capacity = parseInt(document.getElementById('capacity').value);
    let max = parseInt(document.getElementById('max').value);
    let operation = document.getElementById('operation').value;
    if (factor && capacity && max && operation != "default") {
        if (check(factor, capacity, max)) {
            let result = probCalc(factor, capacity, max, operation);
            document.getElementById('calc').value = result;
            let arr = document.getElementsByClassName('result')
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = "block";
            }
        }
    }
}