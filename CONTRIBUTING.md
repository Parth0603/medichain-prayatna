# Contributing to MediChain

Thank you for your interest in contributing to MediChain! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature already exists
- Provide clear use case
- Explain why it would be valuable
- Consider implementation complexity

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/medichain.git
   cd medichain
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide clear description
   - Reference related issues
   - Wait for review

## 📝 Code Style Guidelines

### JavaScript/React
- Use ES6+ syntax
- Use functional components with hooks
- Follow Airbnb style guide
- Use meaningful variable names
- Add comments for complex logic

### Solidity
- Follow Solidity style guide
- Add NatSpec comments
- Use latest stable version
- Optimize for gas efficiency

### Commit Messages
Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build/config changes

## 🧪 Testing

Before submitting PR:
```bash
# Test smart contracts
npx hardhat test

# Test backend
cd backend
npm test

# Test frontend
cd frontend
npm test
```

## 📚 Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Update API documentation
- Include code examples

## 🔒 Security

- Never commit private keys or secrets
- Report security issues privately
- Follow security best practices
- Use environment variables

## 💬 Communication

- Be respectful and constructive
- Ask questions if unclear
- Provide helpful feedback
- Collaborate openly

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make MediChain better for everyone!
