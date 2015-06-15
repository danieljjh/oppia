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
 * @fileoverview Frontend validator for customization args and rules of
 * the interaction.
 */

oppia.filter('oppiaInteractiveInteractiveMapValidator', [
    'WARNING_TYPES', 'baseInteractionValidationService',
    function(WARNING_TYPES, baseInteractionValidationService) {
  // Returns a list of warnings.
  return function(stateName, customizationArgs, ruleSpecs) {
    var warningsList = [];

    if (customizationArgs.latitude.value < -90 || customizationArgs.latitude.value > 90) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'please pick a starting latitude between -90 and 90.'
      });
    }

    if (customizationArgs.longitude.value < -180 || customizationArgs.longitude.value > 180) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'please pick a starting longitude between -180 and 180.'
      });
    }

    var numRuleSpecs = ruleSpecs.length;

    for (var i = 0; i < numRuleSpecs - 1; i++) {
      if (ruleSpecs[i].definition.name === 'Within' || ruleSpecs[i].definition.name === 'NotWithin') {
        if (ruleSpecs[i].definition.inputs.d < 0) {
          warningsList.push({
            type: WARNING_TYPES.CRITICAL,
            message: 'please ensure that all the rules refer to valid distances.'
          });
        }
      }
    }

    warningsList = warningsList.concat(
      baseInteractionValidationService.getAllRuleSpecsWarnings(
        ruleSpecs, stateName));

    return warningsList;
  };
}]);
