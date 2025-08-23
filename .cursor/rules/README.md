# Cursor Rules for Vibe Job Portal

> **🚀 Quick Start**: Read files in this order: `00-ORGANIZATION.md` → `project-context.mdc` → `coding-standards.mdc` → `ui-ux-guidelines.mdc` → `tech-stack-architecture.mdc` → `specs-reference.mdc`

## 🎯 What Are These Files?

These `.mdc` files provide Cursor with comprehensive context about your project, including:
- Project structure and organization
- Coding standards and patterns
- UI/UX guidelines and design principles
- Technical architecture and stack details
- Implementation specifications and references

## 🚀 How It Works

1. **Automatic Loading**: Cursor automatically reads these `.mdc` files when you start working on the project
2. **Context Awareness**: Cursor will understand your project structure, conventions, and requirements
3. **Guided Development**: When you ask questions or request code, Cursor will reference these rules
4. **Consistent Output**: All generated code will follow your established patterns and standards

## 📖 Reading Order & Priority

### **Primary Order (Most Important First):**
1. **`00-ORGANIZATION.md`** - Start here to understand the new file organization
2. **`project-context.mdc`** - Project overview and structure
3. **`coding-standards.mdc`** - Understand development patterns and conventions
4. **`ui-ux-guidelines.mdc`** - Learn design principles and user experience rules
5. **`tech-stack-architecture.mdc`** - Get technical specifications and architecture details
6. **`specs-reference.mdc`** - Reference guide for detailed specifications

### **When to Reference Each File:**
- **Starting a new feature**: Read `00-ORGANIZATION.md` → `project-context.mdc` → `coding-standards.mdc`
- **Building UI components**: Read `00-ORGANIZATION.md` → `ui-ux-guidelines.mdc` → `coding-standards.mdc`
- **Setting up architecture**: Read `00-ORGANIZATION.md` → `tech-stack-architecture.mdc` → `project-context.mdc`
- **Implementing specs**: Read `00-ORGANIZATION.md` → `specs-reference.mdc` → relevant feature specs

## 🔄 Keeping Files in Sync

These `.mdc` files are automatically generated from `CONTEXT.md`. To update them:
1. Modify `CONTEXT.md` with your changes
2. Ask Cursor to "sync the .mdc files with the updated CONTEXT.md"
3. Cursor will automatically update all relevant `.mdc` files

## 📁 File Structure

```
.cursor/rules/
├── 00-ORGANIZATION.md           # Organization guide (read first)
├── README.md                    # This file - reading order and usage guide
├── CONTEXT.md                   # Main project documentation
├── project-context.mdc         # Project overview and structure
├── coding-standards.mdc        # Development patterns and conventions
├── ui-ux-guidelines.mdc        # Design principles and UX rules
├── tech-stack-architecture.mdc # Technical specifications
├── specs-reference.mdc         # Implementation specifications
├── specs-features/             # Feature specifications
│   ├── feature-auth.md         # Authentication system specs
│   ├── feature-job-mgmt.md     # Job management specs
│   ├── feature-jobseeker.md    # Job seeker functionality specs
│   ├── feature-company.md      # Company/employer specs
│   └── feature-summaries.md    # Feature summaries
├── specs-pages/                # Page layout specifications
│   └── home.md                 # Home page specifications
└── specs-components/           # Component specifications
    ├── header.md               # Header component specs
    ├── footer.md               # Footer component specs
    ├── job-ad-item.md         # Job listing item component specs
    └── job-ad-detail.md       # Job detail sheet/modal component specs
```

## 📖 Usage Examples

### When asking Cursor to:
- **Create a new component**: It will follow your component organization and naming conventions
- **Implement a feature**: It will reference the appropriate feature specifications
- **Design a page**: It will follow your UI/UX guidelines and design principles
- **Set up routing**: It will use your established Next.js App Router patterns
- **Organize code**: It will follow your monorepo structure and package organization

### Example prompts:
```
"Create a new job listing component following our design system"
"Implement the authentication flow for job seekers"
"Set up the company dashboard layout"
"Create a new API endpoint for job search"
```

## 🔄 Updating Rules

To update these rules:
1. Edit the appropriate `.mdc` file
2. Save the changes
3. Restart Cursor or start a new chat session
4. The updated rules will be automatically applied

## 📋 Best Practices

1. **Keep rules focused**: Each file should cover a specific aspect of your project
2. **Use clear examples**: Include code examples and specific patterns
3. **Reference specs**: Always point to your detailed specification files
4. **Maintain consistency**: Ensure rules align with your actual project structure
5. **Update regularly**: Keep rules in sync with project changes

## 🎯 Key Benefits

- **Consistent Development**: All team members follow the same patterns
- **Faster Onboarding**: New developers understand the project immediately
- **Better Code Quality**: Generated code follows established standards
- **Reduced Errors**: Fewer mistakes in project structure and conventions
- **Improved Collaboration**: Shared understanding of project requirements

## 🔗 Related Files

- **`CONTEXT.md`** - Main project documentation (now in .cursor/rules/)
- **`specs-features/`** - Detailed feature specifications
- **`specs-pages/`** - Page layout specifications  
- **`specs-components/`** - Component specifications
- **`app/`** - Next.js application code
- **`database/`** - Database schema and migrations
- **`lib/`** - Utility functions and database utilities

Remember: These `.mdc` files work together with your existing documentation to provide Cursor with complete project context!
