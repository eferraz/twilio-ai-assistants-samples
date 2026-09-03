/**
 * @param {import('@twilio-labs/serverless-runtime-types/types').Context} context
 * @param {{ ascent_meters: string; distance_meters: string; }} event
 * @param {import('@twilio-labs/serverless-runtime-types/types').ServerlessCallback} callback
 */
exports.handler = async function (context, event, callback) {
  const { ascent_meters, distance_meters } = event;

  if (ascent_meters === undefined || distance_meters === undefined) {
    return callback(
      new Error(
        "Invalid request. Missing ascent_meters or distance_meters"
      )
    );
  }

  const ascent = Number(ascent_meters);
  const distance = Number(distance_meters);

  if (Number.isNaN(ascent) || Number.isNaN(distance)) {
    return callback(
      new Error("Invalid request. ascent_meters and distance_meters must be numbers")
    );
  }

  if (distance <= 0) {
    return callback(
      new Error("Invalid request. distance_meters must be greater than 0")
    );
  }

  const slope_percentage = (ascent / distance) * 100;
  const slope_degrees = (Math.atan(ascent / distance) * 180) / Math.PI;

  return callback(null, {
    ascent_meters: ascent,
    distance_meters: distance,
    slope_percentage: Math.round(slope_percentage * 100) / 100,
    slope_degrees: Math.round(slope_degrees * 100) / 100,
  });
};
