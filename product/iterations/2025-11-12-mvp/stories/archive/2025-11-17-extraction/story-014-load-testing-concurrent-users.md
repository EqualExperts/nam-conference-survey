# User Story: Load Testing for Concurrent Users

**Story ID**: STORY-014
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, load-testing, performance, reliability

## User Story

As a conference organizer,
I want the survey system to handle 40 concurrent users during the in-conference completion window,
So that the scheduled activity doesn't fail under simultaneous load and all attendees can successfully submit their feedback.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 16 (Load Testing for Concurrent Users)
**User Need**: Implicit reliability requirement from in-conference scheduled activity approach
**Supporting Evidence**:
- Testing checklist item: "Load testing - Verify 40 concurrent users can submit during in-conference window"
- Conference context: 40 total attendees completing during same 5-10 minute break
- Lauren Kessler: In-conference scheduled activity (5-6pm during final conference session)
- Katie Coleman: Survey failure would undermine credibility and waste attendee time
- Worst-case scenario: All 40 attendees start simultaneously when break begins

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: 40 Concurrent Users Submit Successfully - Happy Path**
- **Given** 40 simulated users access the survey simultaneously
- **When** all users complete and submit survey within 5-minute window
- **Then** all 40 submissions are recorded in the database
- **And** no submissions are lost or corrupted
- **And** each user receives the acknowledgment page confirming submission
- **And** no system crashes or unhandled errors occur

**Scenario 2: Acceptable Response Times Under Load**
- **Given** 40 concurrent users are actively using the survey
- **When** users navigate between questions
- **Then** page load times remain under 2 seconds for question transitions
- **And** form submission completes within 3 seconds
- **And** acknowledgment page displays within 2 seconds after submission
- **And** no user experiences timeouts or "server not responding" errors

**Scenario 3: Database Handles Concurrent Writes**
- **Given** multiple users submit surveys at the exact same moment (within 1-second window)
- **When** concurrent database write operations occur
- **Then** database properly handles concurrent transactions without deadlocks
- **And** no data is overwritten by simultaneous writes
- **And** all submissions maintain data integrity (no partial saves)
- **And** unique submission IDs are generated correctly (no ID collisions)

**Scenario 4: System Recovery from Load Spike**
- **Given** 40 concurrent users initially access the survey
- **When** users complete at different paces over 10 minutes
- **Then** system remains stable as load decreases
- **And** late submitters (minute 9-10) experience same performance as early submitters (minute 1-2)
- **And** no degradation in response times as total submissions accumulate

**Scenario 5: CSV Export with 40 Responses**
- **Given** all 40 concurrent users have submitted surveys
- **When** Lauren exports data to CSV immediately after completion window
- **Then** all 40 submissions are present in CSV export
- **And** export generation completes within 5 seconds
- **And** no duplicate entries exist in export
- **And** all data fields are correctly populated (no corruption from concurrent writes)

### Non-Functional Requirements

- [ ] **Performance**: Question transitions < 2s, submission < 3s under 40 concurrent users
- [ ] **Reliability**: 100% submission success rate (no lost data)
- [ ] **Scalability**: System handles 50 concurrent users (25% buffer above expected 40)
- [ ] **Monitoring**: Performance metrics logged during load test (response times, error rates)

### Quality Checklist

- [ ] Load test executed with 40 simulated concurrent users
- [ ] All 40 simulated submissions successfully saved to database
- [ ] Response time metrics collected and meet < 2s threshold
- [ ] Database transaction logs reviewed for deadlocks or errors
- [ ] CSV export tested with 40+ entries for performance
- [ ] Test repeated 3 times to ensure consistent results (not one-time fluke)
- [ ] Edge case tested: All 40 users submit within same 10-second window

## Technical Notes

**Load Testing Tools:**
- **Recommended**: Apache JMeter or k6 for HTTP load testing
- **Alternative**: Locust (Python-based) or Artillery (Node.js-based)
- **Simulated User Behavior**:
  - User arrives at survey homepage
  - Loads Question 1 (delay 0s)
  - Selects answer and advances (delay 5-10s per question)
  - Completes 19 questions (total 2-5 minutes)
  - Submits survey
  - Views acknowledgment page

**Load Test Configuration:**
```yaml
# Example k6 configuration
scenarios:
  concurrent_survey_completion:
    executor: 'shared-iterations'
    vus: 40  # 40 concurrent virtual users
    iterations: 40  # Each user completes once
    maxDuration: '10m'  # Total test window
```

**Performance Monitoring:**
- Response time percentiles: p50, p95, p99
- Error rate: HTTP 5xx errors, timeouts, failed submissions
- Database metrics: Connection pool usage, query execution time, lock wait time
- Server metrics: CPU usage, memory usage, network I/O

**Database Optimization Considerations:**
- Connection pool sized for concurrent load (minimum 40 connections + overhead)
- Indexes on submission timestamp for CSV export query performance
- Transaction isolation level appropriate for concurrent writes (READ COMMITTED or higher)
- Consider database connection pooling if not already implemented

**Bottleneck Identification:**
Common bottlenecks to investigate if load test fails:
1. Database connection pool exhaustion
2. Slow database queries without proper indexes
3. Frontend JavaScript blocking rendering
4. Server thread pool limitations
5. Network bandwidth saturation (unlikely with 40 users)

**Acceptance Criteria for Performance Metrics:**
| Metric | Target | Acceptable | Failure |
|--------|--------|------------|---------|
| Median response time (p50) | < 1s | < 2s | > 2s |
| 95th percentile (p95) | < 2s | < 3s | > 3s |
| Submission success rate | 100% | 98%+ | < 98% |
| Database write time | < 500ms | < 1s | > 1s |

## Design Notes

**Load Test Execution Plan:**

1. **Pre-Test Setup:**
   - Deploy application to production-like environment (same server specs)
   - Seed database with minimal test data (or fresh database)
   - Configure monitoring tools (application logs, database logs, server metrics)
   - Document baseline performance (single user test for comparison)

2. **Test Execution:**
   - Run load test with 40 concurrent users
   - Monitor in real-time for errors or performance degradation
   - Capture all metrics (response times, error logs, database metrics)
   - Screenshot/record any failures for troubleshooting

3. **Post-Test Analysis:**
   - Verify all 40 submissions in database (count query)
   - Review CSV export for completeness and accuracy
   - Analyze performance metrics against acceptance criteria
   - Document bottlenecks identified
   - If test fails: Optimize and retest until passing

4. **Iteration (if needed):**
   - If performance fails: Identify bottleneck (database, server, frontend)
   - Apply optimizations (indexes, caching, connection pooling)
   - Rerun load test to verify improvement
   - Repeat until acceptance criteria met

**Pass/Fail Criteria:**
- **PASS**: All 40 submissions saved correctly, p95 response time < 3s, 0 errors
- **FAIL**: Any submissions lost, p95 > 3s, or any HTTP 5xx errors
- **RETEST REQUIRED**: Edge cases (1-2 submissions lost, intermittent errors)

## Open Questions

- ✅ What server environment will production use? **ANSWER**: Define during technical architecture decisions (Story #3 recommended next step)
- ✅ Do we need to test beyond 40 users? **ANSWER**: Test with 50 users (25% buffer) to ensure headroom
- ✅ What if load test fails on first attempt? **ANSWER**: Acceptable - identify bottleneck, optimize, retest (iterative approach)

## Estimate

**Size**: S (1-2 days)
**Confidence**: Medium (depends on whether optimizations are needed)

**Breakdown:**
- Load testing tool setup and configuration: 2-3 hours
- Load test script development (simulated user behavior): 2-3 hours
- Test execution and monitoring: 1-2 hours
- Results analysis and documentation: 1-2 hours
- If optimization needed: Additional 4-8 hours
  - Database indexing: 2-4 hours
  - Connection pool tuning: 1-2 hours
  - Retest and validation: 1-2 hours

## Dependencies

- Complete MVP application (all features implemented) - cannot load test incomplete system
- Production-like deployment environment - testing on local dev machine not valid
- STORY-005 (CSV Export) - export performance is part of load test validation
- Technical architecture decisions - server specs and database choice affect load capacity

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**High-Stakes Scheduled Activity:**
- Conference break is fixed 5-10 minute window (cannot extend if survey fails)
- 40 attendees waiting simultaneously for system to respond
- Failure visible to entire conference population in real-time
- No fallback option if system crashes (paper surveys not prepared)

**Credibility Risk:**
- Survey tool failure undermines confidence in Equal Experts technical capabilities
- Attendees are consultants and engineers - will immediately recognize poor system design
- Katie and Lauren's credibility affected by tool choice
- Reputational damage if "our own survey tool doesn't work"

**Data Loss Risk:**
- If some submissions fail, responses are lost permanently (attendees won't retry days later)
- Incomplete data set compromises Lauren's analysis (95% response rate target unmet)
- No way to recover lost submissions after conference ends

**Low Effort, High Value:**
- S-sized effort (1-2 days) to prevent catastrophic failure
- Load testing is standard practice for any multi-user application
- Early identification of bottlenecks allows time for optimization before Nov 19 deadline

### Design Decision Rationale

**Why 40 Concurrent Users (Not 40 Total Users Over Time):**
Worst-case scenario is all attendees start simultaneously when break begins. Testing with staggered arrivals would not reveal peak load bottlenecks.

**Why 50 User Test (Not Exactly 40):**
25% buffer provides headroom for unexpected scenarios (e.g., some attendees complete twice by mistake, or future conference with more attendees). Over-provisioning is better than under-provisioning for reliability.

**Why Response Time < 2s Threshold:**
5-minute completion window for 19 questions = ~15 seconds per question. If response time is 2s per question, total is 38s of waiting (leaves 4m22s for reading/answering). Longer response times increase abandonment risk.

**Why 100% Submission Success Rate:**
With zero mandatory fields, users can submit at any point. Failed submissions are likely abandonments (user gives up). Any submission loss reduces response rate toward unacceptable levels.

### Load Testing vs Real-World Usage

**Differences:**
- Load test: All users start simultaneously (worst case)
- Real-world: Users stagger over 5-10 minute window (likely scenario)
- Load test: Automated scripts complete quickly (2-5 minutes)
- Real-world: Humans complete at varied paces (4-10 minutes)

**Why Test Worst Case:**
Real-world behavior is unpredictable. Lauren might say "Everyone start now" at 5pm sharp. Testing worst case ensures system handles edge scenario. If it passes worst case, it will handle real-world.

### Optimization Strategy (If Load Test Fails)

**Database Layer:**
1. Add indexes on submission timestamp and foreign keys
2. Increase connection pool size (default often too small)
3. Use connection pooling library (e.g., pg-pool for PostgreSQL)
4. Review query plans for slow queries (EXPLAIN ANALYZE)

**Application Layer:**
1. Enable HTTP compression (gzip) to reduce response size
2. Implement caching for static assets (CSS, JS)
3. Optimize JavaScript bundle size (code splitting if needed)
4. Review server thread pool configuration

**Infrastructure Layer:**
1. Increase server resources (CPU, RAM) if undersized
2. Use CDN for static assets (if applicable)
3. Enable database query caching (if supported)
4. Review network latency between application and database servers

### When to Execute This Story

**Timing:** After all other stories complete, before Nov 19 testing deadline

**Rationale:** Load testing requires complete functional system. Testing incomplete features wastes time (results invalid after changes). Execute as final validation step.

**Ideal Sequence:**
1. Complete all functional stories (STORY-001 through STORY-013)
2. Deploy to production-like environment
3. Execute load test (this story)
4. If passes: Ready for Nov 19 testing
5. If fails: Optimize and retest before deadline

---

## For Issue Tracker Import

**Title**: Load Testing for 40 Concurrent Users

**Description**:
As a conference organizer, I want the survey system to handle 40 concurrent users during the in-conference completion window, so that the scheduled activity doesn't fail under simultaneous load.

**Source**: Discovery cycle 2025-11-12-mvp, addressing reliability requirement for in-conference scheduled activity approach.

**Acceptance Criteria**: See full criteria above - 40 concurrent users successfully submit surveys, response times < 2s for question transitions, 100% submission success rate, no data loss or corruption, database handles concurrent writes correctly.

**Labels**: 2025-11-12-mvp, load-testing, performance, must-have
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 3 (S-sized, 1-2 days, may require optimization iteration)
