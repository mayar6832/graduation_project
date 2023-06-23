import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
import sys
import json

client = MongoClient('mongodb+srv://zakariayara40:suieySxjWh1SYC04@cluster0.hysfcd7.mongodb.net/test?retryWrites=true&w=majority')
db = client['test']
collection = db['products']
# Read the product ID passed from the Express backend
product_name = sys.argv[1]
product_category= sys.argv[2]

data = collection.find({"categoryName":product_category})
products_list = list(data)
# print(products_list)
products_df = pd.DataFrame(products_list, columns=['name', 'desc', 'image', 'url', 'brand', 'isBestSeller', 'price', 'priceSymbol', 'fullDescription', 'productCategory', 'productInformation', 'categoryName', 'provider', 'average_rating', 'reviews', 'favourite', 'alert', 'newrelease'])
# Preprocess the product descriptions
products_df['processed_desc'] = products_df['fullDescription'].astype(str).apply(lambda x: x.lower())
# Create TF-IDF vectorizer
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(products_df['processed_desc'])
# Compute cosine similarity matrix
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
def get_similar_items(product_name):
    # Get the index of the product in the dataframe
    product_index = products_df.index[products_df['name'] == product_name][0]
    
    # Get the similarity scores of the product with all other products
    sim_scores = list(enumerate(cosine_sim[product_index]))
    
    # Sort the products based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get the top 5 similar items (excluding the product itself)
    top_similar_items = [products_df.iloc[index]['name'] for index, score in sim_scores[1:6]]
    
    return top_similar_items

# Get the recommendations for the given product ID
# print(product_name)
recommendations = get_similar_items(product_name)


# Print the recommendations to the standard output
print(json.dumps(recommendations))
