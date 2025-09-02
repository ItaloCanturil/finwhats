# Use Case Pattern Migration Guidelines

## Migration Todo List

### High Priority Tasks (Start Here)

- [ ] **Task 1**: Create use-cases directory structure with expenses, goals, and messaging subdirectories
- [ ] **Task 2**: Implement AddExpenseUseCase with proper input/output interfaces and business validation
- [ ] **Task 3**: Implement RemoveExpenseUseCase to replace current _actions/expense/remove.ts
- [ ] **Task 5**: Build ProcessWhatsAppMessageUseCase to handle LLM processing and orchestrate other use cases
- [ ] **Task 9**: Refactor API route /api/v1/process/route.ts to use new use cases with dependency injection

### Medium Priority Tasks

- [ ] **Task 4**: Create SetGoalUseCase and GetGoalsUseCase for goal management operations
- [ ] **Task 6**: Create repository interfaces and DrizzleExpenseRepository implementation
- [ ] **Task 7**: Extract LLMService from llmProcessor.ts to separate infrastructure concerns
- [ ] **Task 8**: Create WhatsAppService to encapsulate messaging logic from whatsappSender.ts

### Low Priority Tasks (Final Steps)

- [ ] **Task 10**: Update server actions in _actions folder to call use cases instead of direct database operations

## Migration Strategy

The todo list follows a logical progression:

1. **Foundation** (Tasks 1-3): Set up the core use case structure and implement essential business operations
2. **Orchestration** (Task 5): Create the main use case that coordinates other operations
3. **Interface Integration** (Task 9): Connect the new use cases to your existing API
4. **Infrastructure** (Tasks 6-8): Extract and organize supporting services
5. **Cleanup** (Tasks 4, 10): Complete remaining use cases and update legacy code

## Use Case Pattern Definition

* Each use case encapsulates a single business operation (e.g., `RegisterUser`, `CreatePost`, `SubmitFeedback`)
* A use case is isolated, testable, and injectable
* It only takes input and returns output
* It is decoupled from UI/event sources and can be triggered by UI, background jobs, webhooks, or AI agents

## Target Directory Structure