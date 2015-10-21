---
layout: post
type: post
title: "When You Need a Comparator"
description: "sorting a Collection how you want"
category: xpages
tags: [xpages, java, bean, comparator]
modified: 2015-01-09
comments: true
share: true
---

### Introduction
Many of the XPages Managed Bean demonstrations point to your ability to populate an _xp:comboBox_ with a custom defined <span data-toggle="tooltip" title="java.util.ArrayList">List</span> of <span data-toggle="tooltip" title="javax.faces.model.SelectItem">Select Items</span>. One thing that seems to happen to me is that I wind up having to re-sort such lists to work off of their Label, as opposed to their value; so as to look sorted, at least to human eyes.

##### A Brief ComboBox Anatomy Lesson
An _xp:comboBox_ lets us build out a list (preferably somewhat short) of values with their labels, which are selected from a "drop down" like interface. More specifically, from MDN,

<blockquote>
The HTML select (&lt;select&gt;) element represents a control that presents a menu of options. The options within the menu are represented by &lt;option&gt; elements, which can be grouped by &lt;optgroup&gt; elements. Options can be pre-selected for the user.
</blockquote>

<iframe width="100%" height="140" src="//jsfiddle.net/edm00se/acchh2kv/embedded/result,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

But you're here for the code. Here's an incredibly simple select tag implemented with three options. If you switch to the HTML pane, you'll see that the value (which is what can be data bound for value in the _xp:comboBox_ control) is 1, 2, or 3 while the labels are their English equivalent of One, Two, or Three. In classic Notes, we would achieve this by the usual list (line separated) by passing in sets of _Label &#124; Value_, separated by the pipe character. You can still do this in XPages, but if you're defining the source for one in a bean, you'll want to build out your List<SelectItem>. My sample class below shows this, but the meat and potatoes here is the Comparator.

### A Comparator
Enter [java.util.Comparator](//docs.oracle.com/javase/7/docs/api/java/util/Comparator.html). It's a member of the Collections Framework, making it ideal for sorting Collections (which a List is). So, to begin, we'll define a class (you can nest it in another class, as I have, a stand-alone class, or a member of another, utility class). This class contains a single, public compare method, which returns an int. It returns an int, as that's what's returned by the [compareToIgnoreCase method of java.lang.String](//docs.oracle.com/javase/7/docs/api/java/lang/String.html#compareToIgnoreCase(java.lang.String)). All the compare method is doing is comparing whether the first string is before or after the second string.

### Code
Here's my super simple sample bean, with the _selectOptionsList_ being read-only (no setter method) as it's just the _selectedOption_ being what the value to be stored is.

{% gist 34bc3a534c7e44ff5617 SampleComparatorUse.java %}
<br />
The XPage control implementation is a standard _xp:comboBox_ implemented with the value and select items (options) bound via EL. The value which the user selects is bound to the bean's property of _selectedOption_ while the list of SelectItems (options list, with both value and labels populated) is the _selectOptionsList_ property.

{% gist 34bc3a534c7e44ff5617 SampleSelectItemBean.xsp.xml %}
<br />
[Here's the full gist link](//gist.github.com/edm00se/34bc3a534c7e44ff5617), with class, XPage, and faces-config (in case anyone is looking for how my bean is registered).