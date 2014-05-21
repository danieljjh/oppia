// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controllers for the unresolved answers section of the
 *   state editor.
 *
 * @author sll@google.com (Sean Lip)
 */

function StateStats($scope, $log, warningsData, explorationData, editorContextService) {
  $scope.unresolvedAnswersList = [];

  $scope.initStateStats = function(data) {
    $scope.unresolvedAnswers = data.unresolved_answers;
    $scope.generateUnresolvedAnswersList();
  };

  $scope.$on('guiTabSelected', function(evt) {
    $scope.stateName = editorContextService.getActiveStateName();
    var stateData = explorationData.data.states[$scope.stateName];
    $scope.initStateStats(stateData);
  });

  $scope.generateUnresolvedAnswersList = function() {
    $scope.unresolvedAnswersList = [];
    for (var answerItem in $scope.unresolvedAnswers) {
      $scope.unresolvedAnswersList.push({
        'answer': answerItem,
        'count': $scope.unresolvedAnswers[answerItem]
      });
    }
  };

  $scope.deleteUnresolvedAnswer = function(answer) {
    $scope.unresolvedAnswers[answer] = 0;
    explorationData.resolveAnswers($scope.stateName, [answer]);
    $scope.generateUnresolvedAnswersList();
  };
}

StateStats.$inject = [
  '$scope', '$log', 'warningsData', 'explorationData', 'editorContextService'];
