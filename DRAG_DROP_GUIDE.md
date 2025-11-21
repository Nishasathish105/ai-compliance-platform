# 📁 Drag & Drop File Upload Guide

## ✨ Features

The document upload page now supports **full drag-and-drop functionality** with visual feedback!

## 🎯 How to Use

### Method 1: Drag & Drop
1. Go to the **Upload Document** page
2. Select a document type from the dropdown
3. **Drag a file** from your computer
4. **Drop it** onto the upload area
5. See instant visual feedback
6. Click "Upload & Verify" to process

### Method 2: Click to Browse
1. Go to the **Upload Document** page
2. Select a document type
3. **Click** on the upload area
4. Browse and select a file
5. Click "Upload & Verify"

## 🎨 Visual Feedback

### Normal State
- Dashed border
- Upload icon
- "Drag & drop your document here or click to browse"

### Dragging State
- **Border turns blue** (primary color)
- **Background highlights** with subtle color
- **Upload icon bounces** for attention
- **Text changes** to "📁 Drop your document here"
- **Slight scale effect** (105%) for emphasis

### File Selected
- Shows **file name**
- Shows **file size** in MB
- Ready to upload

## ✅ Validation

The system automatically validates:
- **File size**: Maximum 5MB
- **File types**: JPG, PNG, WEBP, PDF only
- **Error messages**: Clear feedback if validation fails

## 🚀 Supported Actions

### During Upload
- Drag & drop is **disabled** while uploading
- Visual feedback shows processing state
- Prevents multiple simultaneous uploads

### After Upload
- Can drag & drop a new file
- Previous results are cleared
- Ready for next verification

## 💡 Tips

1. **Multiple Files**: If you drop multiple files, only the first one is selected
2. **File Types**: Make sure your file is JPG, PNG, WEBP, or PDF
3. **File Size**: Keep files under 5MB for best performance
4. **Visual Cues**: Watch for the blue highlight when dragging
5. **Success Toast**: You'll see a notification when file is ready

## 🎯 User Experience

### Smooth Transitions
- All state changes are animated
- Smooth color transitions
- Scale effects for emphasis
- Bounce animation on drag

### Clear Feedback
- ✅ Success messages when file is ready
- ❌ Error messages for invalid files
- 📊 File size display
- 🎨 Visual state indicators

## 🔧 Technical Details

### Event Handlers
- `onDragEnter`: Activates drag state
- `onDragOver`: Maintains drag state
- `onDragLeave`: Deactivates drag state
- `onDrop`: Processes dropped files

### Validation Rules
```
✅ Valid: image/jpeg, image/png, image/jpg, image/webp, application/pdf
✅ Size: < 5MB
❌ Invalid: Other file types
❌ Too large: > 5MB
```

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 🎉 Benefits

1. **Faster workflow**: No need to click and browse
2. **Better UX**: Intuitive drag-and-drop interface
3. **Visual feedback**: Always know what's happening
4. **Error prevention**: Validation before upload
5. **Professional feel**: Modern, polished interaction

## 🔄 Workflow Example

```
1. Open Upload page
2. Select "Government ID" from dropdown
3. Drag passport.jpg from desktop
4. Drop onto upload area
   → See blue highlight
   → See bounce animation
   → See success message
5. Click "Upload & Verify"
6. Wait for AI analysis
7. View results
8. Drag another file to start over
```

## 🎨 Design Features

- **Responsive**: Works on desktop and tablet
- **Accessible**: Keyboard navigation still works
- **Smooth**: All transitions are fluid
- **Clear**: Visual states are obvious
- **Professional**: Polished animations

Enjoy the enhanced file upload experience! 🚀
