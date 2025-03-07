const _ = require("lodash");

const assignSecretSanta = (employees, previousAssignments = new Map()) => {
  const availableChildren = [...employees];
  const assignments = [];

  for (const giver of employees) {
    // Exclude giver and their previous child
    const validChildren = availableChildren.filter(
      (r) =>
        r.Employee_EmailID !== giver.Employee_EmailID &&
        r.Employee_EmailID !== previousAssignments.get(giver.Employee_EmailID)
    );

    if (validChildren.length === 0) {
      throw new Error("Secret Santa assignment failed: No valid choices left!");
    }

    // Pick a random child
    const chosenChild = _.sample(validChildren);

    // Store the assignment
    assignments.push({
      Employee_Name: giver.Employee_Name,
      Employee_EmailID: giver.Employee_EmailID,
      Secret_Child_Name: chosenChild.Employee_Name,
      Secret_Child_EmailID: chosenChild.Employee_EmailID,
    });

    // Remove chosen child from available list
    _.remove(
      availableChildren,
      (c) => c.Employee_EmailID === chosenChild.Employee_EmailID
    );
  }

  return assignments;
};

module.exports = { assignSecretSanta };
