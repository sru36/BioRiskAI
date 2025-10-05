# routers/literature.py
from fastapi import APIRouter, HTTPException
import pandas as pd
import os
from db import db_admin1, db_admin2  # import both db connections

router = APIRouter()

# -------------------------
# Choose which admin to use for this collection
# -------------------------
collection = db_admin2['literature']  # or db_admin1['literature']

# -------------------------
# Upload CSV once on startup
# -------------------------
@router.on_event("startup")
async def startup_db():
    csv_file = "nasa_literature.csv"
    if os.path.exists(csv_file):
        df = pd.read_csv(csv_file)
        data = df.to_dict(orient="records")
        count = await collection.count_documents({})
        if count == 0:
            await collection.insert_many(data)
            # Create indexes
            await collection.create_index([("Title", "text"),
                                           ("Abstract", "text"),
                                           ("Authors", "text"),
                                           ("FirstAuthor", "text"),
                                           ("JournalTitle", "text")])
            await collection.create_index("PMID", unique=True)
            await collection.create_index("DOI", unique=True)
            await collection.create_index("PubYear")
            print("CSV uploaded and indexes created.")
        else:
            print("Collection already has data.")
    else:
        print("CSV file not found!")

# -------------------------
# Routes
# -------------------------
@router.get("/papers")
async def get_papers(limit: int = 10, skip: int = 0):
    papers = await collection.find().skip(skip).limit(limit).to_list(limit)
    return papers

@router.get("/search")
async def search_papers(query: str, limit: int = 10):
    papers = await collection.find({"$text": {"$search": query}}).to_list(limit)
    return papers

@router.get("/papers/{pmid}")
async def get_paper(pmid: str):
    paper = await collection.find_one({"PMID": pmid})
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return paper
