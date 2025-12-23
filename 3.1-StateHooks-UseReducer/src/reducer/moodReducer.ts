 const moodReducer = (state: string, action: { type: string }): string => {
  switch (action.type) {
    case 'HAPPY':
      return '😊';
    case 'EXCITED':
      return '🤩';
    case 'CALM':
      return '😌';
    case 'SAD':
      return '😢';
    case 'ANGRY':
      return '😠';
    default:
      return state;
  }
}


export default moodReducer;