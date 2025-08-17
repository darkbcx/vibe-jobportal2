# AI Context Guide - Universal IDE Compatibility

> **🎯 This guide explains how to use Vibe Job Portal's AI context in ANY IDE with AI capabilities**

## 🌍 **Universal Compatibility**

This repository is designed to work with **any AI-enabled IDE**, including:
- **VS Code** (GitHub Copilot, Cursor AI, Amazon CodeWhisperer)
- **JetBrains IDEs** (IntelliJ, WebStorm, PyCharm, etc.)
- **Neovim/Vim** (with AI plugins)
- **Sublime Text** (with AI extensions)
- **Any other editor** with AI integration

## 📚 **Core AI Context Files**

### **1. `CONTEXT.md` - Primary AI Context**
- **Purpose**: Main project overview, structure, and conventions
- **AI Usage**: Reference this file for any project-related questions
- **Compatibility**: ✅ **Works in ALL IDEs**

### **2. `specs/` Folder - Detailed Specifications**
- **Purpose**: Feature specs, component designs, and implementation details
- **AI Usage**: Reference for specific feature development
- **Compatibility**: ✅ **Works in ALL IDEs**

### **3. `README.md` - Project Overview**
- **Purpose**: Quick project introduction and setup
- **AI Usage**: Basic project understanding
- **Compatibility**: ✅ **Works in ALL IDEs**

## 🚀 **How to Use in Different IDEs**

### **VS Code (GitHub Copilot, Cursor AI, etc.)**
```json
// .vscode/settings.json
{
  "ai.contextFiles": [
    "CONTEXT.md",
    "README.md",
    "specs/**/*.md"
  ]
}
```

### **JetBrains IDEs**
- **AI Assistant**: Automatically reads project files
- **Context**: Include `CONTEXT.md` in your prompts
- **Example**: "Based on CONTEXT.md, create a new job component"

### **Neovim/Vim with AI Plugins**
- **AI Plugins**: Read project files automatically
- **Context**: Reference `CONTEXT.md` in your prompts
- **Example**: "Using the project structure from CONTEXT.md..."

### **Any Other AI-Enabled Editor**
- **Manual Reference**: Copy relevant sections from `CONTEXT.md`
- **Context Pasting**: Include key sections in your AI prompts
- **File Reading**: AI extensions typically read project files

## 💡 **Best Practices for Universal AI Usage**

### **1. Always Reference CONTEXT.md**
```
"Based on CONTEXT.md, create a new component following our patterns"
"Using the project structure from CONTEXT.md, implement..."
"According to CONTEXT.md conventions, organize this code..."
```

### **2. Use Specific File References**
```
"Check specs/feature-auth.md for authentication requirements"
"Follow the patterns in specs/components/header.md"
"Use the structure defined in specs/pages/home.md"
```

### **3. Include Relevant Context in Prompts**
```
"Create a job listing component following our:
- Component organization (from CONTEXT.md)
- UI/UX guidelines (from CONTEXT.md)
- Coding patterns (from CONTEXT.md)"
```

## 🔄 **Updating AI Context**

### **For All IDEs:**
1. **Edit `CONTEXT.md`** with your changes
2. **Update `specs/` files** as needed
3. **AI will automatically** read the updated files
4. **No manual sync** required

### **For Cursor Users:**
1. **Edit `CONTEXT.md`** with your changes
2. **Ask Cursor to sync** `.mdc` files
3. **Both systems** stay updated

## 📋 **Quick Reference Commands**

### **Project Structure Questions:**
```
"Show me the project structure from CONTEXT.md"
"What's the component organization pattern?"
"How are packages organized in this monorepo?"
```

### **Development Questions:**
```
"Create a component following our patterns from CONTEXT.md"
"Implement routing using our Next.js App Router structure"
"Set up a new page following our layout conventions"
```

### **Feature Implementation:**
```
"Check specs/feature-auth.md for authentication requirements"
"Implement the job search feature from specs/feature-job-mgmt.md"
"Create the company dashboard from specs/pages/company-dashboard.md"
```

## 🎯 **Key Benefits of This Setup**

1. **Universal Access** - Works in any AI-enabled IDE
2. **No Lock-in** - Not tied to Cursor specifically
3. **Easy Maintenance** - Update one file, works everywhere
4. **Team Flexibility** - Developers can use their preferred IDE
5. **AI Consistency** - Same context regardless of tool choice

## 🚨 **Important Notes**

- **`.cursor/rules/`** folder is **Cursor-specific** and won't work in other IDEs
- **`.mdc` files** are **Cursor-specific** and won't work in other IDEs
- **`CONTEXT.md`** is the **universal source of truth** for all IDEs
- **`specs/` folder** provides **detailed context** for all IDEs

## 🔗 **Related Files**

- **`CONTEXT.md`** - Universal AI context (works everywhere)
- **`.vscode/settings.json`** - VS Code AI configuration
- **`.cursor/rules/`** - Cursor-specific rules (Cursor only)
- **`specs/`** - Detailed specifications (works everywhere)
