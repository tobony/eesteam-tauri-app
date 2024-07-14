import { xsteam2function } from "./xsteam2function.js";
import { xsteam2 } from "./xsteam2.js";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculate);
});

function calculate() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "올바른 숫자를 입력해주세요.";
    } else {
        // var result = xsteam2function(num1, num2);
        var result = xsteam2.h_pT(num1 / 10, num2 + 273.15);
        
        document.getElementById('result').textContent = "결과: " + result.toFixed(2);
    }
}