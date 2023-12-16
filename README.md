# ScratchCard Component

The `ScratchCard` component for React provides an interactive scratch-off effect that reveals content underneath a scratchable surface. It's ideal for creating engaging experiences like scratch-off cards for promotions, games, or revealing hidden messages.

## Features

- **Customizable Dimensions**: Set the width and height of the scratch card.
- **Background Image Support**: Optionally include a background image that appears as the scratchable surface.
- **Dynamic Children Rendering**: Render custom React components or HTML elements beneath the scratchable surface.
- **Custom Brush Size**: Adjust the size of the scratching brush.
- **Completion Callback**: A callback function that triggers when a certain percentage of the surface has been scratched off.
- **Cross-Origin Image Support**: Handles CORS policy for images.

## Installation

```bash
npm i next-scratchcard
```

or

```bash
yarn add next-scratchcard
```

## Usage

Here's a basic example of how to use the `ScratchCard` component:

```jsx
import { ScratchCard } from 'next-scratchcard';

function App() {
  const handleComplete = () => {
    console.log('Scratch card completed!');
  };

  return (
    <ScratchCard finishPercent={30} brushSize={20} onComplete={handleComplete}>
      <img
        height={150}
        width={300}
        src="https://images.pexels.com/photos/14686115/pexels-photo-14686115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
    </ScratchCard>
  );
}
```
