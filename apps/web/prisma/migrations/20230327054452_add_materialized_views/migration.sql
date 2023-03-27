-- This is an empty migration.
CREATE MATERIALIZED VIEW "TokenBalance" AS
	WITH transfersFrom AS (
		SELECT "from" AS address, SUM(value) AS valueFrom FROM "TransferEvent" GROUP BY "from"
	), transfersTo AS (
		SELECT "to" AS address, SUM(value) AS valueTo FROM "TransferEvent" GROUP BY "to"
	) SELECT 
			COALESCE(transfersFrom.address, transfersTo.address) AS address, 
			(COALESCE(valueTo,0) - COALESCE(valueFrom, 0)) AS balance 
			FROM transfersFrom FULL OUTER JOIN transfersTo ON transfersFrom.address = transfersTo.address;

CREATE MATERIALIZED VIEW "Claim" AS
	WITH claims AS (
		SELECT address, SUM(amount) AS amount FROM "CanClaimEvent" GROUP BY address 
	), claimed AS (
		SELECT address, SUM(amount) as "claimedAmount" FROM "HasClaimedEvent" GROUP BY address
	) SELECT 
			COALESCE(claimed.address, claims.address) as address, 
			COALESCE(amount, 0) as "amount",
			COALESCE("claimedAmount", 0) as "claimedAmount",
			COALESCE("claimedAmount" > 0, FALSE) AS "hasClaimed" 
		FROM claimed FULL JOIN claims ON claimed.address = claims.address;	