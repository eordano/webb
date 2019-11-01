export function topicForParcel(parcel: string) {
  return '$' + parcel
}

export function isParcelTopic(topic: string) {
  return topic.charAt(0) === '$'
}

export function topicForAlias(alias: number) {
  return '@' + alias
}

export function isAliasTopic(topic: string) {
  return topic.charAt(0) === '@'
}

export function topicToAlias(topic: string) {
  return parseInt(topic.substr(1), 10)
}