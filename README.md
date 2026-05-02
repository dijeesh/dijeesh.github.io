# dijeesh.github.io

Personal portfolio site built with Hugo. Deployed to GitHub Pages.

## Local Development

```bash
# Install Hugo (macOS)
brew install hugo

# Run local server
hugo server --buildDrafts

# Build for production
hugo --minify
```

## Adding Content

### Blog Post
```bash
hugo new content blog/my-new-post.md
```

Or create a file in `content/blog/` with frontmatter:
```yaml
---
title: "My Post Title"
date: 2025-01-15
tags: [kubernetes, aws]
description: "Brief description"
---
```

### Project
Create a file in `content/projects/`:
```yaml
---
title: "Project Name"
date: 2025-01-15
tags: [Kubernetes, Terraform]
github: "https://github.com/dijeesh/repo"
---
```

### Community
Create a file in `content/community/`:
```yaml
---
title: "Event or Activity"
date: 2025-01-15
---
```

## Deployment

Push to `main` branch. GitHub Actions will build and deploy automatically.

## Structure

```
content/
  blog/          # Blog posts (Markdown)
  projects/      # Project descriptions (Markdown)
  community/     # Community activities (Markdown)
static/
  images/        # Images
  files/         # Downloadable files (resume PDF, etc.)
themes/
  dijeesh-theme/ # Custom theme
```
