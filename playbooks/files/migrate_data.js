/*
 * This migrates 2.1 data to 2.2
 */

/*
 *
 * The 'drafts' collection is no longer used and can be dropped
 * this change predates 2.1, but the collection was never removed
 *
 */
db.drafts.drop()



/*
 *
 * People
 *
 */
// The 'models' collection is now called 'people'
db.models.renameCollection('people', true);

// The shoulderSlope measurement is now different, so we need to remove it
// In addition, the centerBackNeckToWaist measurement is deprecated
db.people.updateMany({}, {$unset: {
  'measurements.shoulderSlope': '',
  'measurements.centerBackNeckToWaist': '',
}})

// The highPointShoulderToBust measurement has been renamed to hpsToBust
db.people.updateMany({}, {$rename: {'measurements.highPointShoulderToBust': 'measurements.hpsToBust'}})


/*
 *
 * Drafts
 *
 */

// The 'recipes' collection is now called 'patterns'
// But there's also a new 'person' field
// This info used to be stored in recipe.model (which is now data.model)
// To pull out this field and store it elsewhere, we'll use the aggregate method
// but that doesn't update our collection, but creates a new one
// So in this case, we'll use this rather than renameCollection() as we did for models
db.recipes.aggregate([
  { "$addFields": {
    "person": {
      "$concat": [ "$recipe.model" ]
    }
  }},
  { "$out": "patterns" }
])
db.recipes.drop()

// The 'recipe' field in the collection is now called 'data'
db.patterns.updateMany({}, {$rename: {'recipe': 'data'}})

// The shoulderSlope measurement is now different, so we need to remove it
// Leaving it or removing it, both will break the draft if recreated with this
// measurment data, but a missing measurement is easier to troubleshoot
// In addition, the centerBackNeckToWaist measurement is deprecated
db.patterns.updateMany({}, {$unset: {
  'data.settings.measurements.shoulderSlope': '',
  'data.settings.measurements.centerBackNeckToWaist': '',
}})

// The highPointShoulderToBust measurement has been renamed to hpsToBust
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.highPointShoulderToBust': 'data.settings.measurements.hpsToBust'}})





