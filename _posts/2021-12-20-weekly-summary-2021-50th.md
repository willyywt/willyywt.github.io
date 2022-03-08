---
layout: post
title: "Yang Wentao's weekly summary (2021 50th)"
last_modified_at: 2022-01-23
categories: weekly-summary
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Prepare for the CAD assignments and exam.

## ObjectARX
ObjectARX (Object Autocad Runtime Extension) is the official AutoCAD API that allows developers to manipulate the inner workings of AutoCAD. The CAD course I am taking now covers the following subjects:
* Create, erase, query and update the AutoCAD entity database
* Create common entities and geometric objects
* Create 3D entites
* Do user interaction in the AutoCAD command line bar (e.g. request user to input a point or choose an entity)
* Do user interaction with MFC dialogs

ObjectARX is completely proprietary to AutoCAD so you must get a valid AutoCAD license to use it.

### Entry point
The CAD course only taught me to handle new custom-defined command: when the arx file (ObjectARX compiles to a dynamic link library with file extension .arx) is loaded, some new commands are added to AutoCAD so that users can use them. When the user use a command, the corresponding callback of such command is the entry point.

The macro `ACED_ARXCOMMAND_ENTRY_AUTO` created in the file `acrxEntryPoint.cpp` registers callbacks of the commands. (The course use Visual Studio to do development, and these files are created by the ObjectARX wizard which is installed together with ObjectARX SDK.)

### Boilerplate code about the database
Doing stuff on the database is a little bit verbose. To update the database you need to lock the document first (or the database open operations will fail: return values other than `Acad::ErrorStatus::eOk`). 
```cpp
acDocManager->lockDocument(acDocManager->curDocument()
```
After locking the database, users cannot interact with the autocad display. 

There's the code to add an entity to the database:

```cpp

AcDbObjectId AddToDatabase(AcDbEntity* pEnt)
{
    AcDbObjectId entId;
    AcDbBlockTable* pBlockTable;
    Acad::ErrorStatus status;
    // must be called after lockDocument() or status will be a failed value
	status = acdbHostApplicationServices()->workingDatabase()->getSymbolTable(pBlockTable, AcDb::kForWrite);
    if (status != Acad::ErrorStatus::eOk) {
        acdbFail(_T("Unable to get pBlockTable\n"));
		return AcDbObjectId::kNull;
	}
    AcDbBlockTableRecord* pBlockTableRecord;
    pBlockTable->getAt(ACDB_MODEL_SPACE, pBlockTableRecord,
    AcDb::kForWrite);
    pBlockTable->close();
    pBlockTableRecord->appendAcDbEntity(entId, pEnt);
    pBlockTableRecord->close();
    return entId;
}
```

You can also query the database with an entityId to get a pointer to `AcDbEntity`, do operations on it, and then update the database:
```cpp
/* assume eId is a known entityId.
   You can get eId at the first oarameter of pBlockTableRecord->appendAcDbEntity(), 
   or by user interactions using acedEntSel() (one by one) or acedSSGet() (multiple) to get a ads_name and then use acdbGetObjectId()
*/
Acad::ErrorStatus status;
AcDbEntity* pEnt;
status = acdbOpenObject(pEnt, eid, AcDb::kForWrite);
if (status != Acad::ErrorStatus::eOk) {
	acdbFail(_T("Cannot open object"));
	return;
}
/* Do something with pEnt */
func(pEnt);
/* Close pEnt */
pEnt->close();
```

After doing the operations you wanted, unlock the document so user can do interaction with autocad display again:
```cpp
acDocManager->unlockDocument(acDocManager->curDocument()
```

### Create entities
Easy, use `AcDb*()` like `AcDbLine* pLine = new AcDbLine(start, end);`.
`AcDbPoint`, `AcDbCircle`, `AcDbArc`, etc.

### Query entity type
```cpp
AcDbEntity* et;
if(et->isA() != AcDbLine::desc()) {
    acutPrintf(_T("not a line\n"));
    return;
}
AcDbLine* line = AcDbLine::cast(et);
// Do something with line
```

### Create 3D entities
Use `AcDb3dSolid`.

#### Create a frustum
```cpp
AcDb3dSolid* pSolid = new AcDb3dSolid();
pSolid->createFrustum(height, xradius, yradius, topxradius);
```

#### Create 3D entity by extrude
This is a little bit boilerplate
```cpp
AcDbObjectId CreateCylinder(
	AcGePoint3d bottom_point,
	double radius,
	AcGeVector3d axis_vec,
	double height
) {
	AcDbCircle* bottom_circle = new AcDbCircle(bottom_point, axis_vec, radius);
	AcDbVoidPtrArray curve_segments, result_segments;
	curve_segments.append(bottom_circle);
	AcDbRegion::createFromCurves(curve_segments, result_segments);
	if (result_segments.length() == 0) {
		acdbFail(_T("Unable to create cylinder bottom region\n"));
		return AcDbObjectId::kNull;
	}
	AcDbRegion* region = (AcDbRegion *)result_segments[0];
	AcDb3dSolid* cylinder = new AcDb3dSolid();
	cylinder->extrude(region, height, 0);
	AcDbObjectId cylinderid = COMMIT(cylinder);
	return cylinderid;
}
```

#### Rotate and transform 3D entity
Use matrix operations to do so:
```cpp
//target_axis must be normalized (length is 1) before calling this function
void _RT(AcDb3dSolid* pSolid, AcGeVector3d target_axis, AcGePoint3d target_center, bool do_rot) {
	AcGeMatrix3d mtransition, mrotate;
	// Do rotate
	// pSolid->createFrustum() creates pSolid with main axis being the Zaxis
	// Rotate around rotate_axis by 180 degree, so the desired axis will be target_axis
	AcGeVector3d rotate_axis = target_axis + AcGeVector3d::kZAxis;
	if (do_rot) {
		mrotate.setToRotation(PI, rotate_axis, AcGePoint3d::kOrigin); //Rotate around rotate_axis by 180 degree
		pSolid->transformBy(mrotate); 
	}
	// Do transform
	AcGeVector3d transistion_vec;
	transistion_vec.set(target_center.x, target_center.y, target_center.z);
	mtransition.setToTranslation(transistion_vec); 
	pSolid->transformBy(mtransition);
}
```

### Request input at the autocad command input

#### Input coordinate, distance, string, etc
Use `acedGetPoint()`, `acedGetDist()`, `acedGetString()`

#### Select entity
Use `acedEntSel()` like `while (acedEntSel(_T("Pick an arc"), ent, pt) == RTNORM)` (user choose one entity at a time) or use `acedSSGet()` (user choose multiple entity at a time).

### MFC Dialog
Ahh, I hate this, touching MFC is bloody

You need to create a dialog under something like "resource.rc" in Visual Studio (btw, the Win32 API about resources are incredibly irritating), assign a class to it (a subclass of `CDialog`, or (better) a subclass of `CAdUiBaseDialog`)(Visual Studio can generate the starter code for you if you use Visual Studio to assign such class), and assign handlers of the corresponding buttons. The dialog need to have a few input boxes so that users can input numbers you wanted

In a handler of such buttons use `GetDlgItemTextW()` to get the strings in the input boxes and parse them like using `_ttof()`, and store them somewhere (like using a magic global data... I cannot understand what `AcApDataManager<CDocData>` is doing so I didn't touch them, and my classmates said it have problems with dialogs). (Don't forget `EndDialog(0)` at the end, or the dialog won't close)
