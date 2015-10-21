---
layout: post
type: gist
title: "Consistent Multi-Value Formatting"
description: "getting values in a consistent format"
category: xpages
tags: [xpages, domino, ssjs, java]
modified: 2014-08-12
comments: true
share: true
---

### Consistent Multi-Value Formatting

The Notes/Domino API is, to be polite, nuanced. It produces interesting results when a sane person might expect a more reasoned approach. For example, one of the staples of Notes/Domino API is the ability to have multi-value fields. Approaching Domino/XPages as a novice a couple years ago, I found it odd that performing a (NotesDocument)getItemValue on a field with multiple values checked in the field properties of the Form, from which the given document was computed (making it effectively a programmatic schema), would still yield a _java.lang.String_ (or its respective object type) when a single value. When the field has multiple values, it returns a _java.util.Vector_ containing the respective objects for its values. To account for this sort of situation, a developer then needs to account for the different types of returned values. This makes an otherwise simple call a bit tedious.

Unbeknownst to me, Mark Leusink must have felt the same, as he posted a helper function to convert any value to an _Array_ in his [$U.toArray XSnippet from December 2, 2011](http://openntf.org/XSnippets.nsf/snippet.xsp?id=convert-any-value-to-an-array). Since I didn't find XSnippets (somehow, I'm not certain how), I created my own version working directly with _java.util.Vector_ s. I believe there is still merit to this, as when it performs the typeof, if it's already a _java.util.Vector_, it does no conversion, as opposed to invoking an additional _toArray()_ call. My version also makes use of a switch block, which means that it handles unexpected results, in my opinion, somewhat gracefully. Have a look.

{% gist 8301433 %}

The first case executes and, knowing that it's in the end format, merely returns it immediately. The second and third case are handled the same, regardless of the differences between a _java.util.ArrayList_ and _Array_, their values are still accessible via bracket notation, making the operations performed, with the exception of _.size()_ versus _.length_ call, the same.

Lastly, the _java.lang.String_, or unexpected results, are wrapped into a _java.util.Vector_ and returned. The bottom line is, no matter what happens, you get back exactly what you expect.

To me, this embodies what we strive for as developers; the need to write functional code which, [as with the Unix philosophy](http://techcrunch.com/2009/08/21/do-one-thing-and-do-it-well-40-years-of-unix/), does "one thing and does it well". The building blocks of our applications need to be sound, consistent, and perform well under pressure. This builds out a temporary variable _only if necessary_ and provides the functionality I had expected in the first place. It's easily built into a helper function library, which is exactly how I use it. Your mileage may vary, but I'm a fan. If anyone has a better way of doing things, I wouldn't mind hearing it.