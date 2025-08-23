# Cursor Rules Organization Guide

> **📖 Reading Order**: Read this file FIRST to understand the new organization
> **🎯 Purpose**: Explains how all files in .cursor/rules work together

## 🏗️ New Organization Structure

### **What Changed:**
- **All specification files** are now in `.cursor/rules/` for automatic access
- **Organized into logical subdirectories** for better navigation
- **Updated references** in all `.mdc` files to point to new locations

### **Why This Matters:**
- **Cursor can now access ALL specifications** automatically
- **No more manual file attachments** needed for code generation
- **Complete context** available for every coding task

## 📁 File Organization

```
.cursor/rules/
├── 00-ORGANIZATION.md           # This file - organization guide
├── README.md                    # Reading order and usage guide
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

## 🚀 How to Use This Organization

### **For Code Generation:**
1. **Start with rules** - Read `.mdc` files for patterns and conventions
2. **Reference specifications** - Use `.md` files for exact requirements
3. **Follow the reading order** - Rules → Specs → Implementation

### **For Feature Development:**
1. **Read `project-context.mdc`** - Understand project structure
2. **Check `coding-standards.mdc`** - Follow development patterns
3. **Review `ui-ux-guidelines.mdc`** - Apply design principles
4. **Reference specific feature specs** - Get exact requirements from `specs-features/`

### **For Component Creation:**
1. **Read component spec** - Get requirements from `specs-components/`
2. **Check related feature specs** - Understand business logic from `specs-features/`
3. **Follow UI/UX guidelines** - Apply design principles
4. **Use coding standards** - Follow established patterns

## 🔄 File References Updated

### **All `.mdc` files now reference:**
- `.cursor/rules/specs-features/` instead of `specs/features/`
- `.cursor/rules/specs-pages/` instead of `specs/pages/`
- `.cursor/rules/specs-components/` instead of `specs/components/`

### **Benefits:**
- **No broken references** - All paths point to accessible files
- **Automatic loading** - Cursor can see all specifications
- **Consistent access** - Same file structure for all development tasks

## 📋 Implementation Workflow

### **When Asked to Create Code:**
1. **Understand the request** - What feature/component/page is needed?
2. **Check relevant specs** - Read the appropriate `.md` files
3. **Apply rules** - Follow patterns from `.mdc` files
4. **Generate code** - Implement according to specifications
5. **Verify structure** - Ensure proper placement and organization

### **Example Workflow:**
```
Request: "Create a job listing component"
1. Read specs-components/job-ad-item.md for requirements
2. Check specs-features/feature-job-mgmt.md for business logic
3. Apply patterns from coding-standards.mdc
4. Follow UI guidelines from ui-ux-guidelines.mdc
5. Generate component following project structure
```

## 🎯 Key Benefits

- **Complete Context**: Cursor has access to all project information
- **No Manual Work**: Specifications are automatically loaded
- **Consistent Results**: All code follows established patterns
- **Better Quality**: Implementation matches exact specifications
- **Faster Development**: No need to search for or attach files

## 🔗 Next Steps

1. **Read this file first** to understand the organization
2. **Follow the reading order** in README.md
3. **Use specifications** from the appropriate subdirectories
4. **Apply rules** from `.mdc` files for consistency
5. **Generate code** that follows all requirements

Remember: **All files are now accessible to Cursor automatically!**
