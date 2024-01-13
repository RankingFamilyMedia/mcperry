import 'package:flutter/material.dart';
import 'package:contacts_service/contacts_service.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ContactDuplicatesScreen(),
    );
  }
}

class ContactDuplicatesScreen extends StatefulWidget {
  @override
  _ContactDuplicatesScreenState createState() => _ContactDuplicatesScreenState();
}

class _ContactDuplicatesScreenState extends State<ContactDuplicatesScreen> {
  List<Contact> _contacts = [];

  @override
  void initState() {
    super.initState();
    _loadContacts();
  }

  Future<void> _loadContacts() async {
    Iterable<Contact> contacts = await ContactsService.getContacts();
    setState(() {
      _contacts = contacts.toList();
    });

    _findAndPrintDuplicates();
  }

  void _findAndPrintDuplicates() {
    Map<String, List<Contact>> contactMap = {};

    // Group contacts by name
    _contacts.forEach((contact) {
      String name = contact.displayName ?? '';
      contactMap.putIfAbsent(name, () => []).add(contact);
    });

    // Print duplicates
    contactMap.forEach((name, contactList) {
      if (contactList.length > 1) {
        print('Duplicate Contacts with name $name:');
        contactList.forEach((contact) {
          print('- ${contact.displayName}');
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Contact Duplicates'),
      ),
      body: ListView.builder(
        itemCount: _contacts.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(_contacts[index].displayName ?? ''),
            subtitle: Text(_contacts[index].phones?.first?.value ?? ''),
          );
        },
      ),
    );
  }
}
