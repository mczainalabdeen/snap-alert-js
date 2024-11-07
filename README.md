# SnapAlert for Javascript

**SnapAlert** is a lightweight and customizable Javascript plugin designed for adding stylish alert notifications to your app. This plugin allows you to easily display alerts, confirmations, prompts, and even custom HTML notifications in a user-friendly way.



## Installation

Here's how to use SnapAlert in your project:

### Installation via CSS

Include the stylesheet on your document's <head>  `</head>` tag.

```html
<head>
  <link rel="stylesheet" href="snapAlert.css">
  <!-- Or -->
  <link rel="stylesheet" href="snapAlert.min.css">
</head>
```

Instead of installing you may use the remote version.

```html
<head>
  <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/snap-alert-js@latest/dist/snapAlert.css">
  <!-- Or -->
  <link rel="stylesheet"
  href="https://unpkg.com/snap-alert-js@latest/dist/snapAlert.min.css">
</head>
```

### Installation via Javscript

Include the Plugin on your document's  before `</body>` tag.

```html
  <script src="/snap-alert.js">
  <!-- Or -->
  <script src="/snap-alert.min.js"></script>
```

Instead of installing you may use the remote version.

```html
  <script src="https://cdn.jsdelivr.net/npm/snap-alert-js@latest/dist/snap-alert.js">
  <!-- Or -->
  <script src="https://unpkg.com/snap-alert-js@latest/dist/snap-alert.min.js"></script>
```

## Usage

You can now use SnapAlert to display different types of alerts. Here are some examples:

#### Basic Alert

```javascript
SnapAlert().alert('Alert Title', 'This is a basic alert.');
```

#### Success Alert

```javascript
SnapAlert().success('Success', 'Your operation was successful!');
```

#### Info Alert

```javascript
SnapAlert().info('Info', 'Be Notice!');
```


#### Error Alert

```javascript
SnapAlert().error('Error', 'Something went wrong.');
```

#### Confirmation Alert with Actions

```javascript
SnapAlert().warning('Are you sure?', 'This action cannot be undone.', {
  enableConfirm: true,
  enableCancel: true,
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  }
});
```

### Step 3: Customizing Alerts

You can customize the options for each alert. For example:

```javascript
SnapAlert().info('Information', 'This is an info alert.', {
  position: 'top right',
  duration: 5000,
  icon: 'custom-icon-class', // Replace with a Boxicons class name (https://boxicons.com)
  isDark: true
});
```

### 4. Displaying HTML Alerts

You can display various types of alerts using the provided methods. Below is an example of how to show a custom HTML alert:

```javascript
SnapAlert().html(`<img src="https://placehold.co/600x400" />`, {
        position: 'top right',
        duration: 5000,
    }
);
```


### Step 5: Set Global Options with `SnapOptions`

You can use the `SnapOptions` method to set global default options for all alerts. This is particularly useful if you want to maintain consistency across multiple alerts.

```javascript
SnapAlert().SnapOptions({
  duration: 5000,
  isDark: true,
  position: 'bottom right'
});
```

#### Example of Using Global Options

After setting global options, all subsequent alerts will use the specified default settings unless overridden by individual alert options:

```javascript
// Set global options
SnapAlert().SnapOptions({
  duration: 4000,
  isDark: false,
});

// Now all alerts will have these default settings
SnapAlert().success('Global Success', 'This alert will use global options.');
SnapAlert().error('Global Error', 'This alert will also use global options.');
```


### `clearAll`

The `clearAll` method is used to remove all active alerts from the screen. This can be useful in scenarios where you want to clear multiple notifications at once, such as when navigating away from a page, or after performing a certain action where notifications are no longer relevant.

```javascript
SnapAlert().clearAll();
```

This will instantly clear all alerts, including success, error, warning, info, and custom HTML alerts, if any are currently visible.


### Available Options

- **rtl**: `false` (Enable/disable right-to-left support)
- **type**: `'info'`, `'success'`, `'error'`, `'warning'`
- **title**: The title of the alert
- **message**: The message of the alert
- **position**: `'top left'`, `'top right'`, `'bottom left'`, `'bottom right'`, `'top center'`, `'bottom center'`.
- **duration**: Time before auto-close (in milliseconds, default is 3000)
- **autoClose**: Automatically close the alert (default is `true`)
- **enableConfirm**: Show confirm button (default is `false`)
- **onConfirm**: Function to execute when confirmed
- **enableCancel**: Show cancel button (default is `false`)
- **onCancel**: Function to execute when cancelled
- **isDark**: Dark mode for the alert (default is `false`)
- **icon**: Custom icon (default icons are provided)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Zainalabdeen Radwan**  
[Website](https://picker.sd) | [Email](mailto:zain@picker.sd)