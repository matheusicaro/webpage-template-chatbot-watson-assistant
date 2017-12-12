angular.module("boot").controller("controller", function ($scope, $http) {

    $("#btn-input").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btn-enter").click();
        }
    });

    $scope.messages = [];
    $scope.userMessage = {};

    var actualContext;

    $http.post("/chat", { "input": { "text": "" }, "context": {} }).then(function (response) {
        
        var message = response.data.output.text[0];

        actualContext = response.data.context;
        $scope.messages.push({
            author: "Chatbot",
            message: message,
            isUser: false
        });
    });

    $scope.sendMessage = function () {

        var message;
        var userMessage = angular.copy($scope.userMessage.text);

        $scope.userMessage.text = "";
        $scope.messages.push({
            author: "User",
            message: userMessage,
            isUser: true
        });

        $http.post("/chat", { "input": { "text": userMessage }, "context": actualContext }).then(function (response) {

            message = response.data.output.text[0];

            $scope.messages.push({
                author: "Chatbot",
                message: message,
                isUser: false
            });

            $('#scroll').stop().animate({
                scrollTop: $('#scroll')[0].scrollHeight
            }, 800);

        });
    }
});

