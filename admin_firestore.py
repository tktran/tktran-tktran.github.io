import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime

cred = credentials.Certificate("./memotori-firebase-adminsdk-b2jz5-c9a743e8de.json")
default_app = firebase_admin.initialize_app(cred)
print(default_app.name)

db = firestore.client()

# just the user
# todo: try-catch like in https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
# doc_ref = db.collection('users').document('tankimtran')
user_doc = db.collection('users').document()
# Behind the scenes, .add(...) and .doc().set(...) are completely equivalent, so you can use whichever is more convenient.
user_doc.set(
	{
    'email': 'tankimtran@gmail.com'
  }
)
print(user_doc.id)

# just the note
note_doc = db.collection('notes').document()
note_doc.set(
	{
		'user': user_doc.id,
	  'contentClozed': '政府的{{c1::決定::decision}}引起了很多不同的{{c2::指責::criticism}}。',
		'contentNativeTranslation': "The government's decision gave rise to a lot of criticism.",
		'contentOriginal': '政府的決定引起了很多不同的指責。',
		'notePost': 'This is a sample post-note.',
		'notePre': 'This is a sample pre-note (indv cloze hints are in contentClozed'
	}
)

now0 = datetime.datetime.now()
# card 1
doc_ref = db.collection('cards').document()
doc_ref.set(
	{
		'note': note_doc.id,
		'active_tf': True,
		'clozeNum': 1,
		'spacingDue': now0,
		'spacingLastDue': now0 - datetime.timedelta(hours=1),
		'spacingLastInterval': 50,
		'spacingLastMultiplier': 2
	}
)

# card 2
doc_ref = db.collection('cards').document()
doc_ref.set(
	{
		'note': note_doc,
		'active_tf': True,
		'clozeNum': 2,
		'spacingDue': now0,
		'spacingLastDue': now0 - datetime.timedelta(hours=1),
		'spacingLastInterval': 50,
		'spacingLastMultiplier': 2
	}
)
