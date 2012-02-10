# cowchsay

A CouchDB show function that renders document text using the [cowsay](http://www.nog.net/~tony/warez/cowsay.shtml) talking cow. 

	 -----
	< moo >
	 -----
	        \   ^__^
	         \  (oo)\_______
	            (__)\       )\/\
	                ||----w |
	                ||     ||

## Why?

1. It might be a useful example for someone, somewhere
2. I like cows

## Installing

Copy `_design/cowsay/show/cowsay.js` into the appropriate location for the
CouchApp tool you are using and push to a CouchDB instance of your choosing.

Or, use [situp.py](https://github.com/drsm79/situp) to push directly:

	situp.py push -d cowsay -e YOUR_DB_NAME -s YOUR_COUCH_URL

## Using

To make the cow say whatever is in `doc.cowtext`, just call the \_show function
for a specific document:

	http://YOUR_COUCH_URL/YOUR_DB_NAME/_design/cowsay/_show/cowsay/YOUR_DOC

If you want to provide some text to be said if `doc.cowtext` doesn't exist,
use the `cowtext` parameter:

	http://YOUR_COUCH_URL/YOUR_DB_NAME/_design/cowsay/_show/cowsay/YOUR_DOC?cowtext=moo

If you just want to render some arbitrary text, call the function without
specifying a document and provide the cowtext parameter:

	http://YOUR_COUCH_URL/YOUR_DB_NAME/_design/cowsay/_show/cowsay?cowtext=moo

Use the `cowtype` parameter to specify the type of cow you want to use:

	http://YOUR_COUCH_URL/YOUR_DB_NAME/_design/cowsay/_show/cowsay/YOUR_DOC?cowtype=moose

If the supplied `cowtype` is not found then no cow will be rendered.

## Limitations

Only supports two cows: default and moose.

Only renders text stored in a document under the key `cowtext`, falling back
to the value of the `cowtext` request parameter if `doc.cowtext` is
not present.