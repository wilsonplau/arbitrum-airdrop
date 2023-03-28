-- CreateIndex
CREATE INDEX "Event_blockNumber_logIndex_idx" ON "Event"("blockNumber", "logIndex");

-- CreateIndex
CREATE INDEX "Event_eventHash_idx" ON "Event"("eventHash");

-- CreateIndex
CREATE INDEX "Event_isProcessed_idx" ON "Event"("isProcessed");
